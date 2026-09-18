# Disability IAT Studies

[![Deploy GitHub Pages](https://github.com/lowell-monis/iat/actions/workflows/deploy.yml/badge.svg)](https://github.com/lowell-monis/iat/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Research Team:** Developed for research led by Dr. Ana Bracic ([bracic@msu.edu](mailto:bracic@msu.edu)).

This repository contains two web-based Implicit Association Test (IAT) studies examining implicit associations between disability and other social identities (Race and Gender). The studies are built using [MinnoJS](https://minnojs.github.io/) and [DataPipe](https://pipe.jspsych.org/).

---

## Live Studies

* **Study 1: Race $\times$ Disability IAT**  
  *Examines implicit associations between race (Black people / White people) and physical disability (Physically Disabled People / Physically Abled People).*  
  [Launch Study 1](https://lowell-monis.github.io/iat/study1/)

* **Study 2: Gender $\times$ Disability IAT**  
  *Examines implicit associations between gender (Women / Men) and physical disability (Physically Disabled People / Physically Abled People).*  
  [Launch Study 2](https://lowell-monis.github.io/iat/study2/)

---

## Study Architecture & Flow

Each study follows a multi-stage flow with consent branching:
1. **Consent Form & Participant Information**: Verbatim IRB consent document.
   * **`I wish to participate in this study`** $\rightarrow$ Proceeds to the study sequence.
   * **`I do not wish to participate in this study`** $\rightarrow$ Directs to a "Thank You" screen and redirects to the MSU Political Science website.
2. **Introduction & Instructions**: Overview and visual key showing category labels and stimulus images.
3. **IAT Reaction-Time Task**: 7-block IAT procedure (Greenwald, McGhee, & Schwartz, 1998).
4. **Demographic Questionnaire**: Survey items (Gender, Race, Partisan Identity).
5. **Debriefing**: Research debriefing page.
6. **Data Upload & Completion Redirect**: Automated DataPipe synchronization (`uploading`) followed by participant redirection to your secret completion payment URL.

---

## Setting Up GitHub Secrets & Replicating the Study

To host your own version of these studies using GitHub Actions and GitHub Pages with hidden configuration tokens:

### Step 1: Fork or Clone the Repository
Fork this repository to your GitHub account.

### Step 2: Configure GitHub Repository Secrets
Go to your GitHub repository $\rightarrow$ **Settings** $\rightarrow$ **Secrets and variables** $\rightarrow$ **Actions** $\rightarrow$ **New repository secret** and add the following 3 secrets:

| Secret Name | Description / Value |
| :--- | :--- |
| `DATAPIPE_STUDY1_ID` | Your DataPipe Experiment ID for Study 1 (e.g. `12MlCB7eHnjP`) |
| `DATAPIPE_STUDY2_ID` | Your DataPipe Experiment ID for Study 2 (e.g. `KQ2pq6uCiqYL`) |
| `COMPLETION_REDIRECT_URL` | Your secret payment / reward completion URL (e.g. `https://app.prolific.co/submissions/complete?cc=YOUR_CODE` or Qualtrics URL) |

### Step 3: Enable GitHub Pages via Actions
1. Go to **Settings $\rightarrow$ Pages**.
2. Under **Build and deployment $\rightarrow$ Source**, select **GitHub Actions**.
3. Every push to `main` will automatically trigger `.github/workflows/deploy.yml`, which injects your secrets into `mgr.js` during the build step and deploys the site to GitHub Pages.

---

## Customizing Images, Labels, and Parameters

* **Category Labels & Redirects**: Edit `study1/mgr.js` or `study2/mgr.js` inside `API.addGlobal({...})`.
* **Stimulus Images**: Place your images in `./images/` and update the `stimulusMedia` array in `study1/raceiat.js` or `study2/genderiat.js`.

---

## Contributions, PRs & Issues

We welcome contributions, bug reports, and enhancements from the research community!

* **Submitting Issues**: If you encounter bugs, layout glitches, or data logging questions, please open an issue under the [Issues tab](https://github.com/lowell-monis/iat/issues).
* **Pull Requests (PRs)**: To contribute code improvements or new IAT tasks, please fork the repository and open a Pull Request against the `main` branch.

---

## References

1. Greenwald, A. G., McGhee, D. E., & Schwartz, J. L. K. (1998). Measuring individual differences in implicit cognition: The Implicit Association Test. *Journal of Personality and Social Psychology*, 74(6), 1464–1480.
2. Greenwald, A. G., Nosek, B. A., & Banaji, M. R. (2003). Understanding and using the Implicit Association Test: I. An improved scoring algorithm. *Journal of Personality and Social Psychology*, 85(2), 197–216.
3. Nosek, B. A., et al. (2007). Pervasiveness and correlates of implicit attitudes and stereotypes. *European Review of Social Psychology*, 18(1), 36–88.