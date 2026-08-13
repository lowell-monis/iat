# Disability IAT Studies

This repository contains two web-based Implicit Association Test (IAT) studies examining implicit associations between disability and other social identities (Race and Gender). The studies were developed for academic research using [MinnoJS](https://minnojs.github.io/) and [DataPipe](https://pipe.jspsych.org/).

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

Each study follows a standardized, multi-stage structure:
1. **Introduction**: Welcome and general study instructions.
2. **IAT Instructions**: Visual legend displaying all category labels and stimulus images.
3. **IAT Reaction-Time Task**: 7-block IAT procedure (Greenwald, McGhee, & Schwartz, 1998; Greenwald, Nosek, & Banaji, 2003).
4. **Demographic Questionnaire**: Explicit survey items (Gender, Race, Partisan Identity).
5. **Debriefing**: Research debriefing page.
6. **Data Upload & Redirect**: Automated DataPipe synchronization (`uploading`) followed by participant redirection to panel rewards or destination URL.

---

## How to Replicate and Launch Your Own Study

To run these studies on your own GitHub Pages account or web server, follow these steps:

### 1. Host the Repository
1. Fork this repository or clone it to your own GitHub account.
2. Go to **Settings $\rightarrow$ Pages** in your GitHub repository.
3. Under **Build and deployment**, select **Deploy from a branch** and choose `main` branch / `root`.
4. Your study URLs will be available at `https://<your-username>.github.io/<repository-name>/study1/` and `https://<your-username>.github.io/<repository-name>/study2/`.

### 2. Connect to DataPipe & OSF
1. Create a free account on the [Open Science Framework (OSF)](https://osf.io/).
2. Create an account on [DataPipe (https://pipe.jspsych.org)](https://pipe.jspsych.org/).
3. Create a new project in DataPipe linked to your OSF repository. DataPipe will generate an **Experiment ID** (e.g., `KQ2pq6uCiqYL`).
4. In `study1/mgr.js` and `study2/mgr.js`, replace the demo Experiment ID with your own ID:
   ```javascript
   // Replace 'YOUR_EXPERIMENT_ID' with your DataPipe Experiment ID
   init_data_pipe(API, 'YOUR_EXPERIMENT_ID', { file_type: 'csv' });
   ```
   *For detailed setup instructions, visit the [MinnoJS DataPipe Guide](https://minnojs.github.io/blog/2023/11/01/running-project-implicits-iat-on-your-own/).*

---

## How to Customize Images, Labels, and Parameters

The codebase has been annotated with comments indicating where to make edits.

### 1. Customizing Category Labels and Redirect URLs
Open `study1/mgr.js` or `study2/mgr.js`:
* **Category Labels**: Modify the strings in `API.addGlobal({...})`:
  ```javascript
  API.addGlobal({
      baseURL: './images/', // Path to your stimulus images folder
      blackLabels: 'Black people',
      whiteLabels: 'White people',
      disabledLabels: 'Physically Disabled People',
      ableLabels: 'Physically Abled People'
  });
  ```
* **Completion Redirect URL**: Update the `url` property in the `redirect` task:
  ```javascript
  redirect: [{
      type: 'redirect',
      name: 'redirecting',
      url: 'https://your-panel-redirection-url.com'
  }]
  ```

### 2. Customizing Stimulus Images
* Place your image files in the `./images/` folder inside `study1` or `study2`.
* Open `study1/raceiat.js` or `study2/genderiat.js` and update the `stimulusMedia` array:
  ```javascript
  category1: {
      name: global.blackLabels,
      stimulusMedia: [
          { image: 'your_custom_image1.jpg' },
          { image: 'your_custom_image2.jpg' }
      ]
  }
  ```

---

## Data Analysis & Processing

### Analyzing IAT Data in R
For calculating D-scores and cleaning raw MinnoJS trial data in R, we recommend using the [`implicitMeasures`](https://github.com/OttaviaE/implicitMeasures) package (Epifania et al., 2020):

```R
library(implicitMeasures)
library(dplyr)

# 1. Import and clean raw MinnoJS IAT CSV files
raw_iat <- import_iat("path/to/datapipe_files", extension = "csv")
cleaned_iat <- clean_iat(raw_iat)

# 2. Compute D-scores
d_scores <- dscore(cleaned_iat)

# 3. Merge demographic survey responses by sessionId
survey_data <- read_csv("path/to/explicits.csv")
final_dataset <- left_join(d_scores, survey_data, by = "sessionId")
```

### Developer Workflows & `just` Recipes

This repository includes a `justfile` and `pyproject.toml` for task automation, code formatting (`ruff`, `black`, `isort` capped at 120 chars), and validation:

```bash
just setup        # Create virtualenv with uv and install dependencies
just fmt          # Format Python files using ruff, isort, and black (120 char line length)
just lint         # Lint Python files using ruff
just check-js     # Validate JavaScript syntax across study scripts
just check        # Run all lints and syntax checks
just run-analysis # Execute Python data processing pipeline
```

---

## DataPipe Experiment IDs & Client Security

**Note on Experiment IDs:** DataPipe Experiment IDs are public frontend client tokens by design (similar to Google Analytics property IDs or Firebase public config objects). Because static web applications run entirely in the participant's browser, client-side scripts must include the Experiment ID in the HTTP POST request to route data to the correct OSF repository. DataPipe protects your project using rate-limiting and OSF repository access controls. Storing the Experiment ID directly in `mgr.js` is the standard and intended implementation.

---

## Credits & Acknowledgments

* **MinnoJS**: Developed by Yoav Bar-Anan, Elad Zlotnick, and Andrew Dzikiewicz at Project Implicit (Zlotnick et al., 2015).
* **MinnoJS IAT Extension & DataPipe Module**: Created by Yoav Bar-Anan (Bar-Anan, 2023).
* **DataPipe Service**: Developed by the jsPsych / MinnoJS open-science ecosystem (pipe.jspsych.org).
* **`implicitMeasures` R Package**: Developed by Ottavia M. Epifania, Pasquale Anselmi, and Egidio Robusto (Epifania et al., 2020).
* **Research Team**: Developed for research led by Dr. Ana Bracic (bracic@msu.edu).

---

## References

1. **Bar-Anan, Y.** (2023). *Running Project Implicit’s IAT on your own* [Blog post]. MinnoJS Documentation. https://minnojs.github.io/blog/2023/11/01/running-project-implicits-iat-on-your-own/
2. **Epifania, O. M., Anselmi, P., & Robusto, E.** (2020). Implicit measures with `implicitMeasures`. *Frontiers in Psychology*, 11, 598379. https://doi.org/10.3389/fpsyg.2020.598379
3. **Greenwald, A. G., McGhee, D. E., & Schwartz, J. L. K.** (1998). Measuring individual differences in implicit cognition: The Implicit Association Test. *Journal of Personality and Social Psychology*, 74(6), 1464–1480.
4. **Greenwald, A. G., Nosek, B. A., & Banaji, M. R.** (2003). Understanding and using the Implicit Association Test: I. An improved scoring algorithm. *Journal of Personality and Social Psychology*, 85(2), 197–216.
5. **Nosek, B. A., Smyth, F. L., Hansen, J. J., Devos, T., Lindner, N. M., Ratliff, K. A., Smith, C. T., Olson, K. R., Chugh, D., Greenwald, A. G., & Banaji, M. R.** (2007). Pervasiveness and correlates of implicit attitudes and stereotypes. *European Review of Social Psychology*, 18(1), 36–88.
6. **Zlotnick, E., Dzikiewicz, A. J., & Bar-Anan, Y.** (2015). *Minno.js* (Version 0.3) [Computer software].