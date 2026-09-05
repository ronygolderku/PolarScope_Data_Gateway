import React from "react";
import { FaArrowLeft, FaKey, FaDownload, FaTerminal, FaPython, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";
import CodeBlock from "../../components/CodeBlock";
import Breadcrumbs from "../../components/Breadcrumbs";

const AccessingData = () => {
  const netrcSnippet = `# Create or append to ~/.netrc in your home directory:
machine urs.earthdata.nasa.gov login YOUR_USERNAME password YOUR_PASSWORD

# Set secure file permissions (mandatory on macOS/Linux):
chmod 600 ~/.netrc`;

  const earthaccessSnippet = `import earthaccess

# Automatically authenticates using ~/.netrc or interactive prompt
auth = earthaccess.login(persist=True)

# Search for ICESat-2 or NSIDC Antarctic sea ice products
results = earthaccess.search_data(
    short_name="ATL07",          # Sea Ice Height
    temporal=("2023-01-01", "2023-01-31"),
    bounding_box=(-180, -90, 180, -60) # Southern Ocean south of 60°S
)

print(f"Found {len(results)} matching granules.")

# Download granules directly to a local directory with progress bar
files = earthaccess.download(results, "./downloads")`;

  const wgetSnippet = `# Step 1: Initialize cookies file
touch ~/.urs_cookies

# Step 2: Download single file or bulk list with resume capability (-c)
wget --load-cookies ~/.urs_cookies \\
     --save-cookies ~/.urs_cookies \\
     --auth-no-challenge=on \\
     --keep-session-cookies \\
     --continue \\
     "https://n5eil01u.ecs.nsidc.org/PM/NSIDC-0051.002/2023.01.01/nt_20230101_f17_v2.1_s.bin"`;

  const opendapSnippet = `import xarray as xr

# Stream data over OPeNDAP directly without downloading the 50GB full file
opendap_url = "https://thredds.daac.ornl.gov/thredds/dodsC/example/southern_ocean.nc"

# Open remote dataset with chunking
ds = xr.open_dataset(opendap_url, chunks={'time': 10})

# Slice only your region of interest (e.g., Weddell Sea)
weddell_subset = ds['sst'].sel(
    lat=slice(-78, -60),
    lon=slice(-60, -20)
).load()  # Only fetches the ~5MB needed for this box

print("Remote subsetting complete. Ready to analyze!")`;

  const cdseTokenSnippet = `# 1. Request OAuth2 token from Copernicus Data Space
curl --location --request POST \\
  'https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token' \\
  --header 'Content-Type: application/x-www-form-urlencoded' \\
  --data-urlencode 'grant_type=password' \\
  --data-urlencode 'username=YOUR_EMAIL' \\
  --data-urlencode 'password=YOUR_PASSWORD' \\
  --data-urlencode 'client_id=cdse-public'`;

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          
          {/* Breadcrumbs & Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Breadcrumbs items={[{ label: "Accessing and Downloading Polar Data" }]} />
            <Link
              to="/tutorials"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4C542] hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Back to Tutorials
            </Link>
          </div>

          {/* Header */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-semibold">
                Beginner
              </span>
              <span className="text-xs text-[#D6E1F0]">20 min read</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3dd6d0]/20 text-[#3dd6d0] font-semibold">
                Download & Auth Cookbook
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center gap-3">
              <FaDownload className="text-[#F4C542]" />
              Accessing & Downloading Polar Data
            </h1>
            <p className="text-lg text-[#D6E1F0] leading-relaxed">
              Step-by-step cookbook for automated bulk retrievals, NASA Earthdata authentication (.netrc), Copernicus access tokens, and OPeNDAP remote streaming.
            </p>
          </section>

          {/* Overview Callout */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">How PolarScope Connects to Data Providers</h2>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              PolarScope is a <strong>discovery gateway</strong>. The underlying data files are hosted directly by major space agencies and environmental research centers (such as NASA NSIDC, ESA Copernicus, EUMETSAT, and NOAA).
            </p>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              Nearly all polar datasets are <strong>free and openly accessible</strong>, but automated downloads require standard machine authentication. This tutorial walks you through setting up your environment once so all future downloads run seamlessly.
            </p>
          </section>

          {/* Method 1: NASA Earthdata Login */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">1</span>
              Method 1: NASA Earthdata Authentication
            </div>
            <h2 className="text-2xl font-bold text-white">Configuring .netrc for NASA & NSIDC</h2>
            <p className="text-sm text-[#D6E1F0]">
              Required for MODIS, ICESat-2, and NSIDC sea ice products. After creating a free account at <a href="https://urs.earthdata.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-[#3dd6d0] underline">urs.earthdata.nasa.gov</a>, configure your local <code>~/.netrc</code> file:
            </p>
            <CodeBlock code={netrcSnippet} language="Bash" title="~/.netrc Configuration" />
          </section>

          {/* Method 2: Python earthaccess */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">2</span>
              Method 2: Programmatic Python Download
            </div>
            <h2 className="text-2xl font-bold text-white">Automated Retrieval with <code>earthaccess</code></h2>
            <p className="text-sm text-[#D6E1F0]">
              The official NASA-supported <code>earthaccess</code> Python library automatically handles authentication tokens, spatial coordinate queries, and multi-threaded downloads:
            </p>
            <CodeBlock code={earthaccessSnippet} language="Python" title="download_icesat.py" />
          </section>

          {/* Method 3: Command-Line Wget / cURL */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">3</span>
              Method 3: Terminal Scripting
            </div>
            <h2 className="text-2xl font-bold text-white">Automated Wget Bulk Downloads with Resume</h2>
            <p className="text-sm text-[#D6E1F0]">
              When downloading years of daily polar files, use <code>wget --continue</code> so that if your connection drops, downloads resume from where they left off:
            </p>
            <CodeBlock code={wgetSnippet} language="Bash" title="bulk_download.sh" />
          </section>

          {/* Method 4: OPeNDAP Remote Streaming */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">4</span>
              Method 4: Zero-Download Streaming
            </div>
            <h2 className="text-2xl font-bold text-white">Streaming Remote Datasets via OPeNDAP</h2>
            <div className="rounded-xl border border-[#3dd6d0]/30 bg-[#3dd6d0]/10 p-4 text-xs sm:text-sm text-[#D6E1F0] leading-relaxed">
              <strong className="text-[#3dd6d0]">Pro Tip for Large Datasets:</strong> If you only need a specific Antarctic sector (e.g. Ross Sea or Weddell Sea), do NOT download 100 GB of global files! OPeNDAP allows your Python script to slice the array on the remote server and transfer only the necessary megabytes.
            </div>
            <CodeBlock code={opendapSnippet} language="Python" title="opendap_streaming.py" />
          </section>

          {/* Method 5: Copernicus Data Space */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">5</span>
              Method 5: Copernicus Data Space (Sentinel Missions)
            </div>
            <h2 className="text-2xl font-bold text-white">Generating Access Tokens for Sentinel Products</h2>
            <p className="text-sm text-[#D6E1F0]">
              Sentinel-1 (SAR) and Sentinel-3 (Altimetry & Ocean Colour) are accessed through Copernicus Data Space with OAuth2 tokens:
            </p>
            <CodeBlock code={cdseTokenSnippet} language="Bash" title="get_cdse_token.sh" />
          </section>

          {/* Next Steps Banner */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Next: Learn to Process NetCDF Files</h3>
              <p className="text-sm text-[#D6E1F0] mt-1">
                Now that you have access, explore our guide on slicing and mapping polar NetCDF arrays in Python.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/tutorials/working-with-netcdf"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-sm font-semibold text-[#071a34] hover:bg-[#e8ba30] transition-colors"
              >
                Next: NetCDF Python Guide →
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                All Tutorials
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AccessingData;
