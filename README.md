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

## Community & Contributing

### 💬 Join the Discussion

Connect with Antarctic and Southern Ocean researchers:

- **[GitHub Discussions](https://github.com/ronygolderku/PolarScope_Data_Gateway/discussions)** - Ask questions, share insights, find collaborators
- **Q&A** - Get help with datasets and analysis methods
- **Show and Tell** - Share your research using PolarScope data
- **Ideas** - Propose new features or datasets

### 🤝 How to Contribute

We welcome contributions from the community!

- **📚 Submit Tutorials** - Share your analysis workflows
- **🗃️ Suggest Datasets** - Request missing Antarctic/Southern Ocean datasets
- **🐛 Report Issues** - Found a bug? Let us know
- **📝 Improve Documentation** - Help make PolarScope more accessible

See our **[Contributing Guide](CONTRIBUTING.md)** for detailed instructions.

### 🔗 Quick Links

- [Report a Bug](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new?template=bug-report.md)
- [Request a Dataset](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new?template=dataset-request.md)
- [Suggest a Feature](https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new?template=feature-request.md)

## License

(To be determined)

## Contact

For questions or collaboration inquiries, please contact the project team.

## Products Tree

```text
products/
├── Atmosphere
	├── aerosol-dust-mass-op-livas
	├── aerosol-dust-od-livas
	├── aerosol-pure-dust-op-livas
	├── albedo-circas
	├── cliima-cloud-od-livas
	├── clima-aerosol-od-all-livas
	├── clima-aerosol-od-livas
	├── clima-aerosol-op-all-livas
	├── clima-aerosol-op-livas
	├── clima-cloud-profile-livas
	├── clima-strat-aerosol-cloud-od-livas
	├── clima-strat-aerosol-cloud-op-livas
	├── cloud-aerosol-circas
	├── cloud-od-averaged-livas
	├── cloud-od-livas
	├── cloud-op-averaged-livas
	├── cloud-op-livas
	├── d13c-ch4-signatures-smart-ch4
	├── dust-od-livas
	├── hdo-total-column-tropomi-clear-sky-wift
	├── hdo-total-column-tropomi-extended-wift
	├── high-res-phytoplankton-chl-a-data-at-discrete-light-stations-polarstern-cruise-ps113
	├── high-res-phytoplankton-chl-a-data-by-undulating-platform-behind-the-ship-polarstern-cruise-ps113
	├── l2b-sif-surface-reflectance-tropomi-troposif
	├── lidar-aerosol-aeolus-swails
	├── lightning-whistler-ilgew
	├── limb-ozone-lpf-solve
	├── mean-spectral-dac-for-320-nm-423nm-in-the-atlantic-ocean
	├── mean-spectral-dac-from-318-to952nm-of-underwater-light-profiles-rv-polarstern-cruise-ps113
	├── mean-spectral-dac-from-320-to917nm-from-radiometric-underwater-light-transmission-profiles
	├── phytoplankton-group-chl-ll-using-the-mean-dac-over-the-first-optical-depth-kdmean-of-the-measured-radiometric-profile
	├── phytoplankton-pigment-concentration-and-phytoplankton-groups-polarstern-cruise-ps113
	├── radiation-budget-circas
	├── stratospheric-ozone-column-limb-sunlit
	├── time-clima-aerosol-od-all-livas
	├── time-clima-aerosol-op-all-livas
	├── total-column-h2o-hdo-clear-sky-lpf-wift
	├── total-column-h2o-hdo-cloudy-lpf-wift
	├── total-ozone-anreo
	├── tropospheric-ozone-column-omi-sunlit
	├── tropospheric-ozone-column-tropomi-sunlit
	└── water-vapour-isotopologues-lpf-weather
├── Cryosphere
	├── albedo-circas
	├── antarctic-ice-shelf-calving-fronts
	├── antarctic-ice-shelf-melt-rates
	├── bedrock-topography-antarctica-bedmachine
	├── bedrock-topography-antarctica-cryosmos
	├── elevation-and-elevation-change-antarctic-cryotop-evolution
	├── esa-cci-permafrost
	├── geothermal-heat-flux-4dantarctica
	├── glacier-elevation-cryosat-mountain-glaciers
	├── gravity-anomalies-goce-airborne-4dantarctica
	├── grounding-line-position-antarctica
	├── ice-sheet-antarctica-l1b-spice
	├── ice-sheet-antarctica-l3-spice
	├── ice-sheet-temperature-antarctica-cryosmos
	├── ice-sheet-velocity-antarctic-2021
	├── ice-shelf-antarctica-cryosmos
	├── ice-temperature-profiles-antarctica
	├── land-ice-elevation-grid-antarctica-cryotop-evolution
	├── land-ice-elevation-point-antarctica-cryotop-evolution
	├── lithosphere-density-temperature-viscosity-goce-antarctica
	├── melt-extent-stage-maps-daily-antarctic
	├── polar-lakes-s1-s2-antarctica
	├── satellite-sar-altimeter-sea-floor-cp4o
	├── sea-ice-clima-snow-depth-lpf-cassis
	├── sea-ice-retracker-clima-snow-depth-lpf-cassis
	├── sea-ice-retracker-snow-depth-cryosat-lpf-cassis
	├── sea-ice-retracker-snow-depth-envisat-lpf-cassis
	├── sea-ice-snow-depth-lpf-cassis
	├── sec-antarctic-ice-sheet
	├── southern-ocean-sit-from-cryosat-2
	├── subglacial-lake-drainage-4dantarctica
	├── supraglacial-lakes-west-4dantarctica
	├── surface-elevation-change-lpf-mitap
	├── surface-melt-antarctic-ice-sheet-1979-2021
	├── surface-melting-antarctica-cryosmos
	├── swath-elelvation-antarctic-ice-sheet-cryotop-evolution
	├── tidal-elevation-amplitude-phase-tide-gauges
	├── tidal-elevation-cryosat2-2019
	├── tidal-elevation-GPS-Brunt-Halley
	├── tidal-elevation-GPS-FilchnerRonne-2009
	├── tidal-elevation-tide-gauge-kerguelen
	└── wet-troposphere-correction-cryosat-cp4o
├── Oceans
	├── albedo-circas
	├── cdom-aeolus-innovation-color
	├── diffuse-attenuation-aeolus-innovation-color
	├── dissolved-organic-carbon-bicep
	├── export-production-bicep
	├── global-marine-phytoplankton-carbon-bicep
	├── global-marine-phytoplankton-primary-production-bicep
	├── global-particulate-organic-carbon-v4-bicep
	├── global-particulate-organic-carbon-v5-bicep
	├── high-res-phytoplankton-chl-a-data-at-discrete-light-stations-polarstern-cruise-ps113
	├── high-res-phytoplankton-chl-a-data-by-undulating-platform-behind-the-ship-polarstern-cruise-ps113
	├── l1b-l2-alongtrack-CCN2coastalproducts-hydrocoastal
	├── l2-along-track-re-tracked-s3-c2-final-hydrocoastal
	├── l2-along-track-re-tracked-s3-c2-testdataset-hydrocoastal
	├── l3_water-level-time-series-s3-c2-final-hydrocoastal
	├── l4_river-discharge-time-series-s3-final-hydrocoastal
	├── mean-spectral-dac-for-320-nm-423nm-in-the-atlantic-ocean
	├── mean-spectral-dac-from-318-to952nm-of-underwater-light-profiles-rv-polarstern-cruise-ps113
	├── mean-spectral-dac-from-320-to917nm-from-radiometric-underwater-light-transmission-profiles
	├── monthly-global-chlorophyll-a-dataset-9-km-oc-cci-v42
	├── monthly-global-export-production-based-on-henson-et-al-2011-dataset-9-km-oc-cci-v42
	├── monthly-global-export-production-based-on-li-et-al-2016-dataset-9-km-oc-cci-v42
	├── monthly-global-microphytoplankton-carbon-dataset-9-km-oc-cci-v42
	├── monthly-global-microphytoplankton-carbon-dataset-9-km-oc-cci-v5
	├── monthly-global-mixed-layer-depth-dataset-9-km-oc-cci-v42
	├── monthly-global-mixed-layer-depth-dataset-9-km-oc-cci-v5
	├── monthly-global-nanophytoplankton-carbon-dataset-9-km-oc-cci-v42
	├── monthly-global-nanophytoplankton-carbon-dataset-9-km-oc-cci-v5
	├── monthly-global-picophytoplankton-carbon-dataset-9-km-oc-cci-v42
	├── monthly-global-picophytoplankton-carbon-dataset-9-km-oc-cci-v5
	├── monthly-global-total-phytoplankton-carbon-dataset-9-km-oc-cci-v42
	├── oceanic-total-alkalinity-and-dissolved-inorganic-carbon-oceansoda
	├── oceansoda-ethz
	├── particulate-backscatter-aeolus-innovation-color
	├── particulate-inorganic-carbon-bicep
	├── phytoplankton-group-chl-ll-using-the-mean-dac-over-the-first-optical-depth-kdmean-of-the-measured-radiometric-profile
	├── phytoplankton-pigment-concentration-and-phytoplankton-groups-polarstern-cruise-ps113
	├── polaris
	├── satellite-sar-altimeter-sea-floor-cp4o
	├── sea-level-lpf-ovalie
	├── sea-level-variability-lpf-ovalie
	├── sea-surface-salinity-godae-oceanview
	├── secchi-disk-depth-lpf-physioglob
	├── sofresh-sea-surface-salinity
	├── stokes-drift-global-ocean-world-ocean-circulation
	├── waposal-waves
	├── wet-troposphere-correction-cryosat-cp4o
	└── wind-stress-vector-world-ocean-circulation
├── Land
	├── albedo-circas
	├── deep-extreme-cubes
	├── fuelity
	├── gpp-sen4gpp
	├── gross-net-carbon-flux-lpf-vad3emecum
	├── grounded-eo-database
	├── l1b-l2-alongtrack-CCN2coastalproducts-hydrocoastal
	├── l2-along-track-re-tracked-s3-c2-final-hydrocoastal
	├── l2-along-track-re-tracked-s3-c2-testdataset-hydrocoastal
	├── l3_water-level-time-series-s3-c2-final-hydrocoastal
	├── l4_river-discharge-time-series-s3-final-hydrocoastal
	├── rainfall-gpm-sm2rain-0-25-v1-global-smos-rainfall
	├── s2l2a-uncertainty-sr-lpf-l2arut
	├── seasfire-cube
	├── surface-elevation-change-lpf-mitap
	└── worldcereal-crop-extent-belgium
├── Solid Earth
	├── chaos-field-model-4d-earth-swarm
	├── chaos-field-model-core-4d-earth-swarm
	├── chaos-field-model-spline-4d-earth-swarm
	├── crust-and-upper-mantle-model-3d-earth
	├── database-of-labelled-sentinel-1-interferograms-v20
	├── geodynamo-simulation-4d-earth-swarm
	├── gravity-anomalies-goce-airborne-4dantarctica
	├── ground-observatory-data-4d-earth-swarm
	├── ground-virtual-observatory-champ-4d-earth-swarm
	├── ground-virtual-observatory-cryosat2-4d-earth-swarm
	├── ground-virtual-observatory-oersted-4d-earth-swarm
	├── ground-virtual-observatory-swarm-4d-earth-swarm
	├── lithosphere-density-temperature-viscosity-goce-antarctica
	├── satellite-data-chaos-field-model-4d-earth-swarm
	└── webgeodyn-py-4d-earth-swarm
├── Magnetosphere Ionosphere
	├── chaos-field-model-4d-earth-swarm
	├── chaos-field-model-core-4d-earth-swarm
	├── chaos-field-model-spline-4d-earth-swarm
	├── cluster-swarm-ac-conjunctions-ion-outflow
	├── cluster-swarm-b-conjunctions-ion-outflow
	├── geodynamo-simulation-4d-earth-swarm
	├── ground-observatory-data-4d-earth-swarm
	├── ground-virtual-observatory-champ-4d-earth-swarm
	├── ground-virtual-observatory-cryosat2-4d-earth-swarm
	├── ground-virtual-observatory-oersted-4d-earth-swarm
	├── ground-virtual-observatory-swarm-4d-earth-swarm
	├── lightning-whistler-ilgew
	├── model-ionosphere-4dionosphere
	├── satellite-data-chaos-field-model-4d-earth-swarm
	├── solar-activity-polar-cap-plasma-density-ion-outflow
	├── sudden-stratospheric-warming-vera
	├── swarm-eiscat-conjunction-list-ion-outflow
	└── webgeodyn-py-4d-earth-swarm
└── Unclassified
	├── addit-earthquake-tsunami-tool-costo
	├── rainfall-prism-0-1-v2-africa-smos-rainfall
	├── rainfall-prism-0-25-v2-africa-smos-rainfall
	└── rainfall-prism-0-25-v4-africa-smos-rainfall
```
