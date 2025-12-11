# PolarScope: Antarctic & Southern Ocean Data Gateway

## About

PolarScope is an open-access digital resource dedicated to Earth Observation (remote sensing) and in-situ data for Antarctica and the Southern Ocean. This platform provides a user-friendly interface for data discovery and selection, with integrated guidance, tutorials, and visualization tools tailored for students and Early Career Researchers (ECRs).

**Project Team:** Md Rony Golder (Curtin U), Peter Struton (UTAS), David Antoine (Curtin U)

## Objectives

This repository is the development hub for building a comprehensive data gateway that will:

- Provide easy access to Antarctic and Southern Ocean Earth Observation and in-situ datasets
- Integrate searchable metadata with interactive visualization tools
- Support Early Career Researchers with tutorials and example workflows
- Combine both satellite and in-situ datasets into a single unified interface

## Background

Building on successful regional prototypes for Western Australia (CSIEM-Satellite and CSIEM-Leaflet), PolarScope extends these approaches to the Antarctic and Southern Ocean. Unlike existing portals such as ESA's Open Science Data Catalogue and SOOSmap, PolarScope directly integrates both satellite and in-situ datasets with example notebooks that guide users in accessing and visualizing data for the polar region.

## Features

- **Searchable Database:** Antarctic and Southern Ocean Earth Observation and in-situ datasets
- **Interactive Visualization:** Built-in tools for data exploration and analysis
- **Documentation:** Comprehensive wiki with guidance and best practices
- **Tutorials:** Step-by-step examples for data access and visualization
- **Example Notebooks:** Ready-to-use workflows for common use cases

## Data Catalogue Structure

The catalogue organizes Antarctic and Southern Ocean satellite observations and in-situ data into three themes: **Atmosphere**, **Ocean**, and **Cryosphere**.

### Data Prioritization

1. **Ocean colour datasets** - Starting with GlobColour (OC-CCI and Copernicus)
2. **Temperature data** - From the UK Met Office
3. **Wind products** - From CCMP
4. **Ice-related datasets** - ICESat-2, OSI SAF, and NSIDC sea ice products
5. **Additional missions** - Sentinel series, CryoSat-2, Aeolus, PACE, Aura, SWOT, Jason-3, MetOp, GCOM-W

### In-situ Data Sources

- Argo floats
- Antarctic research stations (e.g., BAS, AAD)
- Ice Mass Balance Buoys

### Parameters Covered

- Sea ice concentration
- Chlorophyll-a
- Sea surface temperature
- Ocean colour
- Snow cover
- Ozone profiles
- Sea surface height
- Ice thickness

### Data Specifications

- **Spatial Resolution:** 300m (Sentinel-3) to 50 km (SMOS or GCOM-W)
- **Temporal Resolution:** Daily (e.g., Sentinel-3, PACE) to monthly composites (e.g., CryoSat-2)
- **Data Formats:** NetCDF, HDF
- **Temporal Coverage:** Examples include 1979–present for NSIDC
- **Access Methods:** Copernicus Marine Toolbox, NASA Earthdata, API, FTP server

### Metadata Features

- Data format (e.g., NetCDF, HDF)
- Temporal coverage
- File size
- Data access links
- Processing level
- Sensor details (e.g., SRAL, OLCI, ATLAS)
- Provider information (e.g., ESA, NASA)

## Repository Structure

```plaintext
├── database/          # Metadata catalogue and database schemas
├── web/              # Web front-end application
├── tutorials/        # Example notebooks and tutorials
├── wiki/             # Documentation and guidance
└── visualization/    # Data visualization tools and components
```

## Getting Started

(Coming soon)

## Contributing

We welcome contributions from the Antarctic and Southern Ocean research community. Please see our contributing guidelines for more information.

## License

(To be determined)

## Contact

For questions or collaboration inquiries, please contact the project team.
