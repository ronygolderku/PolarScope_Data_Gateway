import React from "react";
import { FaArrowLeft, FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaTerminal } from "react-icons/fa";
import { Link } from "react-router";

const AccessingData = () => {
  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          {/* Back Button */}
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-[#F4C542] hover:text-[#e8ba30] transition-colors"
          >
            <FaArrowLeft />
            Back to Tutorials
          </Link>

          {/* Header */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-medium">
                Beginner
              </span>
              <span className="text-xs text-[#D6E1F0]">20 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Accessing and Downloading Data
            </h1>
            <p className="text-lg text-[#D6E1F0]">
              Step-by-step guide to accessing datasets from different providers, understanding
              download methods, and efficiently retrieving the data you need.
            </p>
          </section>

          {/* Introduction */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
            <p className="text-[#D6E1F0]">
              Once you've found a dataset in the catalogue, the next step is actually getting the data
              onto your computer. This tutorial covers the different methods for accessing data, from
              simple browser downloads to command-line tools and programmatic access.
            </p>
            <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#3dd6d0]">
              <p className="text-sm text-[#D6E1F0]">
                <strong>Remember:</strong> This catalogue provides links to external data providers.
                Each provider may have different access methods, registration requirements, and download limits.
              </p>
            </div>
          </section>

          {/* Step 1: Registration */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  1
                </span>
                STEP ONE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Check Registration Requirements
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
              <p className="text-[#D6E1F0]">
                Many data providers require free registration before you can download data. This helps
                them track usage and provide support.
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Common Provider Accounts</h3>

                <div className="bg-[#143A6A] rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-white">NASA Earthdata Login</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Required for: MODIS, VIIRS, ICESat-2, and most NASA datasets
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    <strong>Sign up:</strong> <span className="text-[#3dd6d0]">urs.earthdata.nasa.gov</span>
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    Free account, approved instantly
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-white">Copernicus Data Space</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Required for: Sentinel-1, 2, 3, 5P, 6 missions
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    <strong>Sign up:</strong> <span className="text-[#3dd6d0]">dataspace.copernicus.eu</span>
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    Free account, instant access to all Sentinel data
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-white">EUMETSAT Data Centre</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Required for: EUMETSAT missions (not Copernicus)
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    <strong>Sign up:</strong> <span className="text-[#3dd6d0]">eoportal.eumetsat.int</span>
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    Free account, some datasets require license acceptance
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-white">NOAA CLASS/CoastWatch</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Required for: NOAA satellite products
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    <strong>Sign up:</strong> <span className="text-[#3dd6d0]">www.class.noaa.gov</span>
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    Some datasets are publicly available without registration
                  </p>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Pro tip:</strong> Register for all major providers at once. Keep your credentials
                    in a password manager for easy access later.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Understanding Access Protocols */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  2
                </span>
                STEP TWO
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Understanding Data Access Protocols
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Different providers use different methods to deliver data. Understanding these protocols
                helps you choose the most efficient download method.
              </p>

              <div className="space-y-4">
                <div className="border border-[#F4C542]/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">HTTP/HTTPS Direct Download</h3>
                    <span className="text-xs px-2 py-1 rounded bg-[#F4C542]/20 text-[#F4C542]">Easiest</span>
                  </div>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    Simple web-based download - click a link and save the file.
                  </p>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-[#D6E1F0]"><strong>Best for:</strong> Single files or small datasets</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Tools:</strong> Web browser, wget, curl</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Speed:</strong> Fast, limited by your internet connection</p>
                  </div>
                  <div className="bg-[#071a34] rounded p-3">
                    <p className="text-xs font-mono text-[#D6E1F0]">
                      # Command line example<br/>
                      wget https://data.provider.org/file.nc
                    </p>
                  </div>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">FTP/SFTP</h3>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    File Transfer Protocol - traditional method for bulk data access.
                  </p>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-[#D6E1F0]"><strong>Best for:</strong> Large bulk downloads, directory browsing</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Tools:</strong> FileZilla, lftp, command-line ftp</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Speed:</strong> Can be faster than HTTP for bulk transfers</p>
                  </div>
                  <div className="bg-[#071a34] rounded p-3">
                    <p className="text-xs font-mono text-[#D6E1F0]">
                      # Command line example<br/>
                      lftp ftp://username@ftp.provider.org<br/>
                      cd /data/2023/<br/>
                      mget *.nc
                    </p>
                  </div>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">OPeNDAP</h3>
                    <span className="text-xs px-2 py-1 rounded bg-[#3dd6d0]/20 text-[#3dd6d0]">Efficient</span>
                  </div>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    Access data remotely without downloading entire files - subset spatially and temporally.
                  </p>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-[#D6E1F0]"><strong>Best for:</strong> Large files when you only need a subset</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Tools:</strong> xarray (Python), MATLAB, IDL</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Speed:</strong> Very fast - only downloads what you need</p>
                  </div>
                  <div className="bg-[#071a34] rounded p-3">
                    <p className="text-xs font-mono text-[#D6E1F0]">
                      # Python xarray example<br/>
                      import xarray as xr<br/>
                      url = "https://server.org/opendap/file.nc"<br/>
                      ds = xr.open_dataset(url)<br/>
                      subset = ds.sel(lat=slice(-80,-60))
                    </p>
                  </div>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">THREDDS Data Server</h3>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    Web-based catalog offering multiple access methods in one place.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-[#D6E1F0]"><strong>Best for:</strong> Browsing catalogs and choosing access method</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Features:</strong> HTTP download, OPeNDAP, WMS, NetCDF subset service</p>
                    <p className="text-sm text-[#D6E1F0]"><strong>Interface:</strong> Web-based file browser with data preview</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Browser Download */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  3
                </span>
                STEP THREE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Method 1: Browser Download (Simple Files)
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
              <p className="text-[#D6E1F0]">
                For single files or small datasets, downloading through your web browser is the easiest method.
              </p>

              <div className="space-y-3">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">1.</span> Navigate to Data Provider
                  </h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Click the data access link from the product page in this catalogue. This takes you
                    to the provider's website.
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">2.</span> Log In (if required)
                  </h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Use your registered account credentials. Some sites remember your login for future visits.
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">3.</span> Browse or Search
                  </h4>
                  <p className="text-sm text-[#D6E1F0] mb-2">
                    Find the specific file you need by:
                  </p>
                  <ul className="space-y-1 text-sm text-[#D6E1F0] ml-4">
                    <li>• Navigating directory structure (by date, region, etc.)</li>
                    <li>• Using the provider's search interface</li>
                    <li>• Filtering by date range, coordinates, or product type</li>
                  </ul>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">4.</span> Download
                  </h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Right-click the file and choose "Save Link As..." or click to download directly.
                    Save to an organized folder structure.
                  </p>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Organization tip:</strong> Create a folder structure like:<br/>
                    <code className="text-xs bg-[#071a34] px-2 py-1 rounded">data/mission/variable/year/</code><br/>
                    Example: <code className="text-xs bg-[#071a34] px-2 py-1 rounded">data/sentinel3/chlorophyll/2023/</code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Command Line Download */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  4
                </span>
                STEP FOUR
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Method 2: Command-Line Download (Bulk Data)
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                For multiple files or automated downloads, command-line tools are more efficient.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <FaTerminal className="text-[#F4C542]" />
                    Using wget
                  </h3>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    wget is a simple, reliable download tool available on Linux, Mac, and Windows (Git Bash).
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download single file</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        wget https://data.provider.org/dataset/file.nc
                      </p>
                    </div>

                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download with custom filename</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        wget -O my_filename.nc https://data.provider.org/file.nc
                      </p>
                    </div>

                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download with authentication</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        wget --user=username --password=pass https://data.provider.org/file.nc
                      </p>
                    </div>

                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download all files from a list</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        wget -i file_list.txt
                      </p>
                      <p className="text-xs text-[#D6E1F0] mt-2">
                        (where file_list.txt contains one URL per line)
                      </p>
                    </div>

                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Resume interrupted download</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        wget -c https://data.provider.org/large_file.nc
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <FaTerminal className="text-[#F4C542]" />
                    Using curl
                  </h3>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    curl is another popular tool, often pre-installed on Mac and Linux.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download single file</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        curl -O https://data.provider.org/file.nc
                      </p>
                    </div>

                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download with custom filename</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        curl -o my_filename.nc https://data.provider.org/file.nc
                      </p>
                    </div>

                    <div className="bg-[#071a34] rounded p-4">
                      <p className="text-xs text-[#F4C542] mb-2"># Download with authentication</p>
                      <p className="text-sm font-mono text-[#D6E1F0]">
                        curl -u username:password https://data.provider.org/file.nc -O
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#3dd6d0]">
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-[#3dd6d0] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Security note:</strong> Don't put passwords directly in commands if others
                    can see your terminal history. Use credential files or netrc configuration instead.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Python Download */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  5
                </span>
                STEP FIVE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Method 3: Programmatic Download (Python)
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                For automated workflows and large-scale data retrieval, Python scripts are ideal.
              </p>

              <div className="space-y-4">
                <div className="bg-[#071a34] rounded p-4">
                  <p className="text-xs text-[#F4C542] mb-3"># Simple download with requests</p>
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import requests
from pathlib import Path

url = "https://data.provider.org/file.nc"
output_path = Path("downloads/file.nc")

# Create directory if needed
output_path.parent.mkdir(parents=True, exist_ok=True)

# Download
response = requests.get(url, stream=True)
response.raise_for_status()

with open(output_path, 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)

print(f"Downloaded to {output_path}")`}
                  </pre>
                </div>

                <div className="bg-[#071a34] rounded p-4">
                  <p className="text-xs text-[#F4C542] mb-3"># Download with progress bar</p>
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import requests
from tqdm import tqdm

url = "https://data.provider.org/file.nc"
response = requests.get(url, stream=True)
total_size = int(response.headers.get('content-length', 0))

with open('file.nc', 'wb') as f:
    with tqdm(total=total_size, unit='B', unit_scale=True) as pbar:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
            pbar.update(len(chunk))`}
                  </pre>
                </div>

                <div className="bg-[#071a34] rounded p-4">
                  <p className="text-xs text-[#F4C542] mb-3"># Download multiple files from list</p>
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import requests
from pathlib import Path

urls = [
    "https://data.provider.org/file1.nc",
    "https://data.provider.org/file2.nc",
    "https://data.provider.org/file3.nc",
]

for url in urls:
    filename = Path(url).name
    print(f"Downloading {filename}...")

    response = requests.get(url)
    with open(filename, 'wb') as f:
        f.write(response.content)

    print(f"  ✓ {filename} complete")`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="rounded-2xl border border-[#F4C542]/30 bg-[#143A6A] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-[#F4C542] text-xl" />
              <h2 className="text-xl font-semibold text-white">Best Practices Checklist</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Start with a test file before bulk downloading</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Check available disk space before downloading</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Respect provider download limits and policies</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Use OPeNDAP for large files when possible</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Verify file integrity after download (check file size)</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Keep download scripts and URLs organized</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Read provider documentation for best access method</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>Save metadata and source information with files</span>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
            <p className="text-[#D6E1F0] mb-4">
              Now that you can download data, learn how to open and work with it in Python!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tutorials/working-with-netcdf"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                Next: Working with NetCDF Files →
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Find Data to Download
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccessingData;
