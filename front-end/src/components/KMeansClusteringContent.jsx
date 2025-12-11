import { useEffect } from 'react';
import './KMeansClusteringContent.css';

export default function KMeansClusteringContent() {
  useEffect(() => {
    // Render KaTeX equations after component mounts
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  }, []);

  return (
    <div className="kmeans-article">
      <div className="article-header">
        <div className="breadcrumb">ML Fundamentals / Unsupervised Learning</div>
        <h1>K-Means Clustering</h1>
        <p className="subtitle">A partitioning algorithm that divides data into K distinct, non-overlapping clusters by minimizing within-cluster variance</p>
      </div>

      <section>
        <h2>Overview</h2>
        <p>K-Means is one of the most popular unsupervised machine learning algorithms used for clustering analysis. Unlike supervised learning, clustering doesn't require labeled data—instead, it discovers natural groupings within the data based on similarity. The algorithm partitions n observations into k clusters, where each observation belongs to the cluster with the nearest centroid.</p>
        <p>K-Means is widely used in customer segmentation, image compression, anomaly detection, document clustering, and as a preprocessing step for other algorithms. Its simplicity, scalability, and speed make it a go-to choice for exploratory data analysis and pattern discovery.</p>
      </section>

      <section>
        <h2>The Algorithm</h2>
        <p>K-Means follows an iterative refinement approach using two alternating steps: assignment and update. The algorithm converges when cluster assignments no longer change or a maximum number of iterations is reached.</p>

        <div className="algorithm-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Initialize</h4>
              <p>Randomly select K data points as initial centroids, or use K-Means++ for smarter initialization</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Assign</h4>
              <p>Assign each data point to the nearest centroid based on Euclidean distance</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Update</h4>
              <p>Recalculate centroids as the mean of all points assigned to each cluster</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Repeat</h4>
              <p>Iterate steps 2-3 until convergence (no change in assignments) or max iterations</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Essential Equations</h2>

        <div className="equation-card">
          <div className="equation-label">Euclidean Distance</div>
          <div className="equation">{"$$d(x, \\mu_k) = \\sqrt{\\sum_{j=1}^{n} (x_j - \\mu_{kj})^2}$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Objective Function (Within-Cluster Sum of Squares)</div>
          <div className="equation">{"$$J = \\sum_{k=1}^{K} \\sum_{x_i \\in C_k} ||x_i - \\mu_k||^2$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Centroid Update Rule</div>
          <div className="equation">{"$$\\mu_k = \\frac{1}{|C_k|} \\sum_{x_i \\in C_k} x_i$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Silhouette Score</div>
          <div className="equation">{"$$s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$$"}</div>
          <p className="equation-note">where a(i) = mean intra-cluster distance, b(i) = mean nearest-cluster distance</p>
        </div>
      </section>

      <section>
        <h2>Algorithm Visualization</h2>

        <h3>Clustering Iteration Process</h3>
        <div className="clustering-viz">
          <svg viewBox="0 0 600 250" className="cluster-svg">
            {/* Iteration 1 - Random initialization */}
            <g transform="translate(0, 0)">
              <text x="75" y="20" fontSize="12" fontWeight="600" fill="#1e3a5f" textAnchor="middle">Iteration 1</text>
              <rect x="10" y="30" width="130" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>

              {/* Data points */}
              <circle cx="35" cy="60" r="5" fill="#94a3b8"/>
              <circle cx="45" cy="80" r="5" fill="#94a3b8"/>
              <circle cx="55" cy="70" r="5" fill="#94a3b8"/>
              <circle cx="40" cy="95" r="5" fill="#94a3b8"/>

              <circle cx="95" cy="55" r="5" fill="#94a3b8"/>
              <circle cx="110" cy="70" r="5" fill="#94a3b8"/>
              <circle cx="100" cy="85" r="5" fill="#94a3b8"/>
              <circle cx="115" cy="60" r="5" fill="#94a3b8"/>

              <circle cx="70" cy="120" r="5" fill="#94a3b8"/>
              <circle cx="85" cy="135" r="5" fill="#94a3b8"/>
              <circle cx="60" cy="140" r="5" fill="#94a3b8"/>
              <circle cx="95" cy="125" r="5" fill="#94a3b8"/>

              {/* Initial centroids (random) */}
              <circle cx="50" cy="100" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
              <circle cx="90" cy="70" r="8" fill="#3b82f6" stroke="#fff" strokeWidth="2"/>
              <circle cx="70" cy="130" r="8" fill="#22c55e" stroke="#fff" strokeWidth="2"/>

              <text x="75" y="165" fontSize="9" fill="#64748b" textAnchor="middle">Random centroids</text>
            </g>

            {/* Arrow */}
            <path d="M 150 95 L 175 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

            {/* Iteration 2 - First assignment */}
            <g transform="translate(185, 0)">
              <text x="75" y="20" fontSize="12" fontWeight="600" fill="#1e3a5f" textAnchor="middle">Iteration 2</text>
              <rect x="10" y="30" width="130" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>

              {/* Cluster 1 - Red */}
              <circle cx="35" cy="60" r="5" fill="#fca5a5"/>
              <circle cx="45" cy="80" r="5" fill="#fca5a5"/>
              <circle cx="55" cy="70" r="5" fill="#fca5a5"/>
              <circle cx="40" cy="95" r="5" fill="#fca5a5"/>

              {/* Cluster 2 - Blue */}
              <circle cx="95" cy="55" r="5" fill="#93c5fd"/>
              <circle cx="110" cy="70" r="5" fill="#93c5fd"/>
              <circle cx="100" cy="85" r="5" fill="#93c5fd"/>
              <circle cx="115" cy="60" r="5" fill="#93c5fd"/>

              {/* Cluster 3 - Green */}
              <circle cx="70" cy="120" r="5" fill="#86efac"/>
              <circle cx="85" cy="135" r="5" fill="#86efac"/>
              <circle cx="60" cy="140" r="5" fill="#86efac"/>
              <circle cx="95" cy="125" r="5" fill="#86efac"/>

              {/* Updated centroids */}
              <circle cx="44" cy="76" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
              <circle cx="105" cy="68" r="8" fill="#3b82f6" stroke="#fff" strokeWidth="2"/>
              <circle cx="78" cy="130" r="8" fill="#22c55e" stroke="#fff" strokeWidth="2"/>

              <text x="75" y="165" fontSize="9" fill="#64748b" textAnchor="middle">Assign & update</text>
            </g>

            {/* Arrow */}
            <path d="M 335 95 L 360 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

            {/* Final - Converged */}
            <g transform="translate(370, 0)">
              <text x="75" y="20" fontSize="12" fontWeight="600" fill="#1e3a5f" textAnchor="middle">Converged</text>
              <rect x="10" y="30" width="130" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>

              {/* Final clusters with boundaries */}
              <ellipse cx="44" cy="76" rx="30" ry="25" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3"/>
              <ellipse cx="105" cy="68" rx="25" ry="25" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3"/>
              <ellipse cx="78" cy="130" rx="30" ry="20" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="1" strokeDasharray="3"/>

              {/* Cluster 1 - Red */}
              <circle cx="35" cy="60" r="5" fill="#ef4444"/>
              <circle cx="45" cy="80" r="5" fill="#ef4444"/>
              <circle cx="55" cy="70" r="5" fill="#ef4444"/>
              <circle cx="40" cy="95" r="5" fill="#ef4444"/>

              {/* Cluster 2 - Blue */}
              <circle cx="95" cy="55" r="5" fill="#3b82f6"/>
              <circle cx="110" cy="70" r="5" fill="#3b82f6"/>
              <circle cx="100" cy="85" r="5" fill="#3b82f6"/>
              <circle cx="115" cy="60" r="5" fill="#3b82f6"/>

              {/* Cluster 3 - Green */}
              <circle cx="70" cy="120" r="5" fill="#22c55e"/>
              <circle cx="85" cy="135" r="5" fill="#22c55e"/>
              <circle cx="60" cy="140" r="5" fill="#22c55e"/>
              <circle cx="95" cy="125" r="5" fill="#22c55e"/>

              {/* Final centroids */}
              <circle cx="44" cy="76" r="8" fill="#ef4444" stroke="#fff" strokeWidth="3"/>
              <circle cx="105" cy="68" r="8" fill="#3b82f6" stroke="#fff" strokeWidth="3"/>
              <circle cx="78" cy="130" r="8" fill="#22c55e" stroke="#fff" strokeWidth="3"/>

              <text x="75" y="165" fontSize="9" fill="#64748b" textAnchor="middle">Final clusters</text>
            </g>

            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>

            {/* Legend */}
            <g transform="translate(520, 50)">
              <text x="0" y="0" fontSize="10" fontWeight="600" fill="#1e3a5f">Legend</text>
              <circle cx="10" cy="20" r="5" fill="#94a3b8"/>
              <text x="22" y="24" fontSize="9" fill="#64748b">Data point</text>
              <circle cx="10" cy="40" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2"/>
              <text x="22" y="44" fontSize="9" fill="#64748b">Centroid</text>
            </g>
          </svg>
        </div>
      </section>

      <section>
        <h2>Choosing K: The Elbow Method</h2>
        <p>One of the main challenges in K-Means is selecting the optimal number of clusters. The Elbow Method plots the within-cluster sum of squares (WCSS) against different values of K, looking for an "elbow" point where adding more clusters yields diminishing returns.</p>

        <div className="elbow-viz">
          <svg viewBox="0 0 450 220" className="elbow-svg">
            {/* Grid */}
            <defs>
              <pattern id="elbowGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect x="50" y="20" width="360" height="160" fill="url(#elbowGrid)"/>

            {/* Axes */}
            <line x1="50" y1="180" x2="410" y2="180" stroke="#1e3a5f" strokeWidth="1.5"/>
            <line x1="50" y1="20" x2="50" y2="180" stroke="#1e3a5f" strokeWidth="1.5"/>

            {/* Axis labels */}
            <text x="230" y="210" fontSize="12" fill="#1e3a5f" textAnchor="middle">Number of Clusters (K)</text>
            <text x="20" y="100" fontSize="12" fill="#1e3a5f" textAnchor="middle" transform="rotate(-90, 20, 100)">WCSS</text>

            {/* X-axis ticks */}
            <text x="90" y="195" fontSize="10" fill="#64748b" textAnchor="middle">1</text>
            <text x="140" y="195" fontSize="10" fill="#64748b" textAnchor="middle">2</text>
            <text x="190" y="195" fontSize="10" fill="#64748b" textAnchor="middle">3</text>
            <text x="240" y="195" fontSize="10" fill="#64748b" textAnchor="middle">4</text>
            <text x="290" y="195" fontSize="10" fill="#64748b" textAnchor="middle">5</text>
            <text x="340" y="195" fontSize="10" fill="#64748b" textAnchor="middle">6</text>
            <text x="390" y="195" fontSize="10" fill="#64748b" textAnchor="middle">7</text>

            {/* Elbow curve */}
            <path
              d="M 90 40 L 140 80 L 190 120 L 240 140 L 290 150 L 340 155 L 390 158"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3"
            />

            {/* Data points on curve */}
            <circle cx="90" cy="40" r="5" fill="#0ea5e9"/>
            <circle cx="140" cy="80" r="5" fill="#0ea5e9"/>
            <circle cx="190" cy="120" r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2"/>
            <circle cx="240" cy="140" r="5" fill="#0ea5e9"/>
            <circle cx="290" cy="150" r="5" fill="#0ea5e9"/>
            <circle cx="340" cy="155" r="5" fill="#0ea5e9"/>
            <circle cx="390" cy="158" r="5" fill="#0ea5e9"/>

            {/* Elbow annotation */}
            <line x1="190" y1="120" x2="190" y2="180" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
            <text x="200" y="105" fontSize="10" fill="#f59e0b" fontWeight="600">Elbow point</text>
            <text x="200" y="117" fontSize="9" fill="#f59e0b">(optimal K=3)</text>
          </svg>
        </div>

        <div className="callout info">
          <div className="callout-title">Other Methods for Choosing K</div>
          <ul>
            <li><strong>Silhouette Analysis:</strong> Measures how similar points are to their own cluster vs other clusters</li>
            <li><strong>Gap Statistic:</strong> Compares WCSS to expected WCSS under null reference distribution</li>
            <li><strong>Domain Knowledge:</strong> Sometimes the number of clusters is known from the problem context</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Sample Data</h2>

        <div className="table-container">
          <div className="table-header">Customer Segmentation Example</div>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Annual Income ($K)</th>
                <th>Spending Score</th>
                <th>Cluster</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>15</td>
                <td>39</td>
                <td><span className="label-tag cluster-0">Low Income</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>16</td>
                <td>81</td>
                <td><span className="label-tag cluster-1">Budget Shoppers</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>77</td>
                <td>87</td>
                <td><span className="label-tag cluster-2">High Value</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>78</td>
                <td>17</td>
                <td><span className="label-tag cluster-3">High Income Savers</span></td>
              </tr>
              <tr>
                <td>5</td>
                <td>48</td>
                <td>50</td>
                <td><span className="label-tag cluster-4">Average</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Python Implementation</h2>

        <div className="code-block">
          <div className="code-header">
            <div className="code-dots">
              <span className="code-dot"></span>
              <span className="code-dot"></span>
              <span className="code-dot"></span>
            </div>
            <span>kmeans_clustering.py</span>
          </div>
          <pre><code>{`# K-Means Clustering with scikit-learn
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import numpy as np
import matplotlib.pyplot as plt

# Sample data: Customer Annual Income and Spending Score
X = np.array([
    [15, 39], [16, 81], [17, 6], [18, 77], [19, 40],
    [48, 52], [49, 55], [50, 47], [51, 52], [52, 59],
    [77, 87], [78, 88], [79, 81], [80, 84], [81, 89],
    [75, 14], [77, 17], [78, 22], [79, 16], [80, 19]
])

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Find optimal K using Elbow Method
wcss = []
K_range = range(1, 11)
for k in K_range:
    kmeans = KMeans(n_clusters=k, init='k-means++', random_state=42)
    kmeans.fit(X_scaled)
    wcss.append(kmeans.inertia_)

# Fit K-Means with optimal K
optimal_k = 4
kmeans = KMeans(
    n_clusters=optimal_k,
    init='k-means++',       # Smart initialization
    n_init=10,              # Number of initializations
    max_iter=300,           # Maximum iterations
    random_state=42
)
clusters = kmeans.fit_predict(X_scaled)

# Evaluate clustering
silhouette_avg = silhouette_score(X_scaled, clusters)
print(f"Silhouette Score: {silhouette_avg:.3f}")
print(f"Inertia (WCSS): {kmeans.inertia_:.2f}")
print(f"\\nCluster Centers (scaled):\\n{kmeans.cluster_centers_}")
print(f"\\nCluster assignments: {clusters}")`}</code></pre>
        </div>

        <div className="callout">
          <div className="callout-title">K-Means++ Initialization</div>
          <p>K-Means++ is a smart initialization technique that spreads out initial centroids, avoiding poor convergence due to random initialization. It selects centroids with probability proportional to their squared distance from existing centroids, leading to better and more consistent results.</p>
        </div>
      </section>

      <section>
        <h2>Advantages & Limitations</h2>

        <div className="pros-cons-grid">
          <div className="pros-card">
            <h4>Strengths</h4>
            <ul>
              <li>Simple and easy to implement</li>
              <li>Scales well to large datasets</li>
              <li>Fast convergence (O(n·K·I·d))</li>
              <li>Works well with spherical clusters</li>
              <li>Guaranteed to converge</li>
              <li>Easy to interpret results</li>
            </ul>
          </div>
          <div className="cons-card">
            <h4>Limitations</h4>
            <ul>
              <li>Must specify K in advance</li>
              <li>Sensitive to initialization</li>
              <li>Assumes spherical clusters</li>
              <li>Sensitive to outliers</li>
              <li>Not suitable for varying cluster sizes</li>
              <li>Only finds convex clusters</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>When to Use K-Means</h2>

        <div className="use-cases-grid">
          <div className="use-case">
            <div className="use-case-icon">🛒</div>
            <h4>Customer Segmentation</h4>
            <p>Group customers by purchasing behavior for targeted marketing</p>
          </div>
          <div className="use-case">
            <div className="use-case-icon">🖼️</div>
            <h4>Image Compression</h4>
            <p>Reduce colors in images by clustering similar pixel values</p>
          </div>
          <div className="use-case">
            <div className="use-case-icon">📄</div>
            <h4>Document Clustering</h4>
            <p>Organize documents into topic groups for search engines</p>
          </div>
          <div className="use-case">
            <div className="use-case-icon">🔍</div>
            <h4>Anomaly Detection</h4>
            <p>Identify outliers as points far from any cluster centroid</p>
          </div>
        </div>
      </section>
    </div>
  );
}
