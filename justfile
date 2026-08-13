# justfile for Disability IAT Studies repository

# Display available recipes
default:
    @just --list

# Initialize Python virtual environment with uv and install dependencies
setup:
    uv venv
    uv pip install ruff black isort pandas numpy scipy matplotlib

# Format Python code using ruff, isort, and black (capped at 120 chars)
fmt:
    @echo "Formatting Python files with ruff, isort, and black (line-length = 120)..."
    uv run ruff check --select I --fix .
    uv run ruff format --line-length 120 .
    uv run black --line-length 120 .

# Lint Python code using ruff
lint:
    @echo "Linting Python files with ruff..."
    uv run ruff check .

# Validate JavaScript syntax across all study scripts using Node
check-js:
    @echo "Checking JavaScript syntax across study scripts..."
    node -c study1/mgr.js study1/explicits.js study1/raceiat.js study2/mgr.js study2/explicits.js study2/genderiat.js
    @echo "All JavaScript files passed syntax check successfully!"

# Run all checks (Python linting and JavaScript syntax check)
check: lint check-js

# Run Python data processing pipeline
run-analysis:
    uv run python analysis/process_data.py
