# Contributing to PolarScope

We welcome contributions from the Antarctic and Southern Ocean research community.

---

## 🚀 Quick Links

- **GitHub Repository:** https://github.com/ronygolderku/PolarScope_Data_Gateway
- **Report Issues:** https://github.com/ronygolderku/PolarScope_Data_Gateway/issues
- **Project Team:** Md Rony Golder (Curtin U), Peter Struton (UTAS), David Antoine (Curtin U)

---

## 📚 Contributing a Tutorial

Have a Jupyter notebook with Antarctic data analysis? Share it!

### How to Contribute:

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/ronygolderku/PolarScope_Data_Gateway.git
   cd PolarScope_Data_Gateway
   ```

2. **Add your notebook**
   - Place it in `public/notebooks/`
   - Use descriptive filename: `topic_dataset_method.ipynb`
   - Include clear markdown cells explaining each step

3. **Create a pull request**
   ```bash
   git checkout -b tutorial/your-topic
   git add public/notebooks/your_notebook.ipynb
   git commit -m "Add tutorial: Your Topic"
   git push origin tutorial/your-topic
   ```

### Tutorial Requirements:
- Clear title and description
- List datasets used (with links)
- Include code comments
- Show expected outputs (plots, results)

---

## 🗃️ Suggesting a Dataset

Missing Antarctic/Southern Ocean data you need?

**[Open a Dataset Request](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new?template=dataset-request.md)**

Include:
- Dataset name and provider
- Data access URL or DOI
- Why it's valuable for polar research
- Spatial/temporal coverage

We prioritize:
- Satellite/remote sensing data (our focus)
- Antarctic and Southern Ocean coverage
- Openly accessible datasets
- Well-documented products

---

## 🐛 Reporting Issues

Found a bug, broken link, or incorrect metadata?

**[Report an Issue](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new?template=bug-report.md)**

Include:
- Clear description
- Steps to reproduce
- Screenshots (if UI issue)
- Browser and OS

---

## 📝 Improving Documentation

Help make PolarScope more accessible:
- Fix typos or unclear text
- Add examples to tutorials
- Improve data access instructions

Edit files in:
- `src/Pages/` (website pages)
- `README.md` (project overview)
- Tutorial notebooks (`public/notebooks/`)

Submit via pull request.

---


## 🛠️ Development Setup

**Prerequisites:**
- Node.js 18+
- Git

**Local development:**
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Site runs at http://localhost:5173

---

## 📋 Code Guidelines

### JavaScript/React:
- Follow existing component patterns
- Use Tailwind utility classes for styling
- Keep components simple and focused

### Commit Messages:
- Use present tense: "Add feature" not "Added feature"
- Be descriptive: "Add OSI SAF ice drift tutorial" not "Add tutorial"
- Reference issues: "Fix search bug (#123)"

### STAC Metadata:
- Follow STAC specification v1.0.0
- Include all required fields (title, description, extent)
- Link to authoritative data sources

---

## 🙏 Thank You

Your contributions help make Antarctic research more accessible. Whether it's a tutorial, bug report, or dataset suggestion, every contribution strengthens the community.

---

## 📧 Contact

**Project Lead:** Md Rony Golder (Curtin University)  
**Contributors:** Peter Struton (UTAS), David Antoine (Curtin U)  
**Email:** ACEAS.Project.Office@utas.edu.au

For questions, open an issue or contact the team.

---

*Last updated: September 6, 2026*
