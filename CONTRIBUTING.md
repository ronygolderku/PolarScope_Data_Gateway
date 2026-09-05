# Contributing to PolarScope Data Gateway

We welcome contributions from the Antarctic and Southern Ocean research community! 🇦🇶

## Ways to Contribute

### 💬 Join the Discussion

Have questions? Want to share insights? Looking for collaborators?

**[Join GitHub Discussions →](https://github.com/ronygolderku/PolarScope_Data_Gateway/discussions)**

- **Q&A**: Ask questions about datasets, analysis methods, or data access
- **Show and Tell**: Share your research using PolarScope data
- **Ideas**: Propose new features or datasets
- **General**: Connect with other Antarctic/Southern Ocean researchers

---

### 📚 Submit a Tutorial

Have a useful analysis workflow? Share it with the community!

**How to contribute a tutorial:**

1. **Fork the repository**
   ```bash
   git clone https://github.com/ronygolderku/PolarScope_Data_Gateway.git
   ```

2. **Create a new tutorial**
   - Add your Jupyter notebook to `public/notebooks/`
   - Follow the naming convention: `topic_dataset_analysis.ipynb`
   - Include clear markdown cells explaining each step

3. **Tutorial Requirements:**
   - **Header**: Title, author, date, objective
   - **Data sources**: List datasets used (with PolarScope links)
   - **Prerequisites**: Required packages (environment.yml or requirements.txt)
   - **Clear steps**: Well-commented code cells
   - **Outputs**: Include expected outputs (plots, statistics)
   - **References**: Cite data sources and methods

4. **Submit via Pull Request**
   ```bash
   git checkout -b tutorial/my-analysis
   git add public/notebooks/my_tutorial.ipynb
   git commit -m "Add tutorial: My Antarctic Analysis"
   git push origin tutorial/my-analysis
   ```
   Then open a PR with description of what the tutorial covers.

**Tutorial Template:** See `public/notebooks/TEMPLATE_tutorial.ipynb`

---

### 🗃️ Suggest a Dataset

Missing a dataset you need? Let us know!

**[Open a Dataset Request →](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new?template=dataset-request.md)**

Include:
- Dataset name and provider
- Data URL or DOI
- Why it's valuable for Antarctic/Southern Ocean research
- Relevant publications (if any)

We prioritize datasets that:
- Cover Antarctic/Southern Ocean region
- Are openly accessible
- Have good documentation
- Fill gaps in current catalog

---

### 🐛 Report Issues

Found a broken link? Incorrect metadata? Bug in the site?

**[Report an Issue →](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new)**

Please include:
- Clear description of the problem
- Steps to reproduce (if applicable)
- Screenshots (if UI issue)
- Expected vs. actual behavior

---

### 📝 Improve Documentation

Help make PolarScope more accessible!

**Documentation improvements:**
- Fix typos or unclear explanations
- Add examples to existing tutorials
- Improve data access instructions
- Translate content (future)

**How:**
1. Edit files in `src/Pages/` (for website pages)
2. Or edit `README.md`, `COLLABORATION_REVIEW.md`, etc.
3. Submit PR with your improvements

---

### 🎨 UI/UX Improvements

Have design suggestions? Found accessibility issues?

**[Open a Discussion →](https://github.com/ronygolderku/PolarScope_Data_Gateway/discussions/new?category=ideas)**

We're always looking to improve:
- Accessibility (screen readers, keyboard navigation)
- Mobile responsiveness
- Search functionality
- Data visualization

---

## Contribution Guidelines

### Code Style
- **JavaScript/React**: Follow existing component patterns
- **CSS**: Use Tailwind utility classes
- **Commit messages**: Descriptive, present tense ("Add tutorial" not "Added tutorial")

### Data Standards
- **STAC compliant**: Follow SpatioTemporal Asset Catalog format
- **Metadata**: Include all required fields (extent, temporal, keywords)
- **DOIs**: Link to authoritative sources

### Tutorial Standards
- **Reproducible**: Include all package versions
- **Well-documented**: Markdown cells explain the "why"
- **Tested**: Verify notebook runs end-to-end
- **Data access**: Use public data sources (no login required if possible)

---

## Community Guidelines

### Be Respectful
- Welcome researchers at all career stages
- Assume good intentions
- Provide constructive feedback
- Cite others' work appropriately

### Share Openly
- Use open licenses where possible
- Share data sources and methods
- Give credit to data providers
- Acknowledge collaborators

### Stay On Topic
- Focus on Antarctic/Southern Ocean research
- Keep discussions relevant to earth observation, oceanography, cryosphere
- Use appropriate discussion categories

---

## Recognition

Contributors are recognized in:
- **GitHub Contributors** page (automatic)
- **Tutorial bylines** (author name + institution)
- **Release notes** (for significant contributions)
- **Annual reports** (major contributors)

---

## Getting Help

### New to GitHub?
- [GitHub Quickstart Guide](https://docs.github.com/en/get-started/quickstart)
- [How to create a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Markdown Guide](https://www.markdownguide.org/)

### Questions about PolarScope?
- Check the [Documentation](http://localhost:5173/documentation)
- Read [Getting Started](http://localhost:5173/getting-started)
- Ask in [GitHub Discussions](https://github.com/ronygolderku/PolarScope_Data_Gateway/discussions)

### Contact the Team
- **Project Lead**: Md Rony Golder (Curtin U)
- **Contributors**: Peter Struton (UTAS), David Antoine (Curtin U)
- **Email**: [Contact via GitHub Issues]

---

## Project Structure

```
PolarScope_Data_Gateway/
├── public/
│   ├── data/              # STAC catalog (products, themes, missions)
│   └── notebooks/         # Tutorial Jupyter notebooks
├── src/
│   ├── Pages/             # React page components
│   ├── components/        # Reusable UI components
│   └── context/           # React context providers
├── README.md              # Project overview
├── CONTRIBUTING.md        # This file
└── COLLABORATION_REVIEW.md # Collaboration assessment
```

---

## Development Setup

**Prerequisites:**
- Node.js 18+
- npm or yarn
- Git

**Local development:**
```bash
# Clone the repository
git clone https://github.com/ronygolderku/PolarScope_Data_Gateway.git
cd PolarScope_Data_Gateway

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

**Build for production:**
```bash
npm run build
npm run preview
```

---

## License

(To be determined)

Data linked from PolarScope remains under the original provider's license. Tutorial contributions should use permissive licenses (MIT, CC-BY) to maximize reuse.

---

## Thank You!

Your contributions help make Antarctic and Southern Ocean research more accessible, collaborative, and impactful. Every tutorial, dataset suggestion, and discussion post strengthens the community! 🙏

**[Start Contributing →](https://github.com/ronygolderku/PolarScope_Data_Gateway/discussions)**

---

*Last updated: September 5, 2026*
