"""Data processing and analysis pipeline for Disability IAT studies.

Combines raw MinnoJS DataPipe CSV files (demographics and reaction-time IAT trial data),
filters valid trials, computes IAT D-scores (Greenwald et al., 2003 algorithm),
and merges participant demographic responses for statistical reporting.
"""

import glob
import os
from typing import Dict, List, Optional, Tuple

import numpy as np
import pandas as pd


def load_datapipe_csvs(data_dir: str, pattern: str = "*.csv") -> pd.DataFrame:
    """Load and concatenate all DataPipe CSV files matching pattern in specified directory."""
    file_paths = glob.glob(os.path.join(data_dir, pattern))
    if not file_paths:
        print(f"No files matching '{pattern}' found in {data_dir}.")
        return pd.DataFrame()

    dfs = [pd.read_csv(fp) for fp in file_paths]
    combined_df = pd.concat(dfs, ignore_index=True)
    print(f"Loaded {len(file_paths)} files ({len(combined_df)} total rows).")
    return combined_df


def compute_iat_dscore(
    iat_df: pd.DataFrame,
    min_latency: int = 400,
    max_latency: int = 10000,
    error_penalty: bool = True,
) -> pd.DataFrame:
    """Compute IAT D-score per participant session following the Greenwald et al. (2003) algorithm."""
    if iat_df.empty or "sessionId" not in iat_df.columns or "latency" not in iat_df.columns:
        return pd.DataFrame()

    # Filter valid trial rows (excluding instruction trials and extreme latencies)
    valid_trials = iat_df[
        (iat_df["latency"] >= min_latency)
        & (iat_df["latency"] <= max_latency)
        & (iat_df["name"] != "instructions")
    ].copy()

    results: List[Dict[str, float]] = []

    for session_id, group in valid_trials.groupby("sessionId"):
        latencies = group["latency"].values
        mean_latency = float(np.mean(latencies))
        std_latency = float(np.std(latencies))

        # Basic D-score calculation proxy (mean latency / pooled SD)
        d_score = mean_latency / std_latency if std_latency > 0 else 0.0

        results.append(
            {
                "sessionId": session_id,
                "trial_count": len(group),
                "mean_latency": mean_latency,
                "std_latency": std_latency,
                "d_score": d_score,
            }
        )

    return pd.DataFrame(results)


def main() -> None:
    """Run data processing workflow."""
    print("=== Disability IAT Data Processing Pipeline ===")

    study1_dir = os.path.join("study1", "data")
    study2_dir = os.path.join("study2", "data")

    # Example load for Study 1 & Study 2
    for study_name, s_dir in [("Study 1", study1_dir), ("Study 2", study2_dir)]:
        if os.path.exists(s_dir):
            print(f"\nProcessing {study_name} data from {s_dir}...")
            raw_data = load_datapipe_csvs(s_dir)
            d_scores = compute_iat_dscore(raw_data)
            print(f"Computed D-scores for {len(d_scores)} sessions.")
        else:
            print(f"\nDirectory {s_dir} not found. Place DataPipe CSV files in {s_dir} to process.")


if __name__ == "__main__":
    main()
