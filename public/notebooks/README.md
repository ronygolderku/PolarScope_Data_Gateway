# Tutorial Notebooks

This folder contains Jupyter notebooks with complete code, outputs, and visualizations for the tutorials.

## Available Notebooks

### 1. Sea Surface Temperature Analysis
- **File**: `sst_so.ipynb`
- **Source**: https://github.com/ronygolderku/so_sst
- **Description**: 32 years (1991-2022) of NOAA SST data analysis for the Southern Ocean
- **Includes**: Mean SST maps, trend analysis, oceanic fronts visualization
- **View online**: https://ronygolderku.github.io/so_sst/

### 2. Antarctic Sea Ice Analysis (OSI SAF)
- **File**: `antarctic_sea_ice_index.ipynb`
- **Source**: https://gitlab.eumetsat.int/eumetlab/oceans/ocean-training/sensors/learn-osi-saf-sea-ice
- **Description**: EUMETSAT OSI SAF Antarctic sea ice extent and ice index analysis
- **Includes**: Monthly and daily Antarctic sea ice index, trend analysis, visualization
- **Focus**: Southern Ocean / Antarctic sea ice only (Arctic sections removed for clarity)

## How to Use

1. **Download** the `.ipynb` file
2. **Open** in Jupyter Lab/Notebook, VS Code, or Google Colab
3. **Run** the cells to reproduce the analysis
4. **Modify** parameters for your own research

## Adding More Notebooks

To add tutorial notebooks:
1. Place the `.ipynb` file in this folder
2. Update the tutorial page with links to view/download
3. Ensure images are embedded in the notebook (they'll display in the viewer)

## Requirements

See individual notebooks for required Python packages. Common dependencies:
- xarray
- matplotlib
- cartopy
- numpy
- pandas
