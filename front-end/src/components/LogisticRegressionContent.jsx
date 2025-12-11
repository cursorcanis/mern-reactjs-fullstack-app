import { useEffect } from 'react';
import './LogisticRegressionContent.css';

export default function LogisticRegressionContent() {
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
    <div className="logistic-regression-article">
      <div className="article-header">
        <div className="breadcrumb">ML Fundamentals / Supervised Learning</div>
        <h1>Logistic Regression</h1>
        <p className="subtitle">A probabilistic classification algorithm that models the probability of a binary outcome using the logistic (sigmoid) function</p>
      </div>

      <section>
        <h2>Overview</h2>
        <p>Despite its name, Logistic Regression is a classification algorithm, not a regression algorithm. It predicts the probability that an instance belongs to a particular class by applying the logistic (sigmoid) function to a linear combination of input features. This transforms the output to a value between 0 and 1, which can be interpreted as a probability.</p>
        <p>Logistic Regression is widely used in many fields including medicine (disease diagnosis), marketing (customer churn prediction), finance (credit risk assessment), and natural language processing (spam detection). Its popularity stems from its simplicity, interpretability, and efficiency.</p>
      </section>

      <section>
        <h2>The Sigmoid Function</h2>
        <p>The sigmoid function is the heart of logistic regression. It maps any real-valued number to a value between 0 and 1, making it perfect for probability estimation.</p>

        <div className="equation-card">
          <div className="equation-label">Sigmoid Function</div>
          <div className="equation">{"$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$"}</div>
        </div>

        <div className="sigmoid-visualization">
          <svg viewBox="0 0 400 200" className="sigmoid-svg">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="400" height="200" fill="url(#grid)"/>

            {/* Axes */}
            <line x1="40" y1="100" x2="360" y2="100" stroke="#333" strokeWidth="1.5"/>
            <line x1="200" y1="20" x2="200" y2="180" stroke="#333" strokeWidth="1.5"/>

            {/* Axis labels */}
            <text x="370" y="105" fontSize="12" fill="#333">z</text>
            <text x="205" y="15" fontSize="12" fill="#333">σ(z)</text>

            {/* Y-axis labels */}
            <text x="175" y="25" fontSize="10" fill="#666">1.0</text>
            <text x="175" y="105" fontSize="10" fill="#666">0.5</text>
            <text x="175" y="185" fontSize="10" fill="#666">0.0</text>

            {/* X-axis labels */}
            <text x="55" y="115" fontSize="10" fill="#666">-4</text>
            <text x="115" y="115" fontSize="10" fill="#666">-2</text>
            <text x="275" y="115" fontSize="10" fill="#666">2</text>
            <text x="335" y="115" fontSize="10" fill="#666">4</text>

            {/* Sigmoid curve */}
            <path
              d="M 40 175 Q 80 175, 120 170 Q 160 160, 200 100 Q 240 40, 280 30 Q 320 25, 360 25"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
            />

            {/* Decision boundary line */}
            <line x1="200" y1="100" x2="200" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
            <circle cx="200" cy="100" r="5" fill="#ef4444"/>
            <text x="210" y="90" fontSize="10" fill="#ef4444" fontWeight="600">Decision Boundary</text>

            {/* Asymptote annotations */}
            <line x1="40" y1="25" x2="360" y2="25" stroke="#10b981" strokeWidth="1" strokeDasharray="4"/>
            <line x1="40" y1="175" x2="360" y2="175" stroke="#10b981" strokeWidth="1" strokeDasharray="4"/>
          </svg>
        </div>

        <div className="callout info">
          <div className="callout-title">Properties of the Sigmoid</div>
          <ul>
            <li>Output range: (0, 1) - perfect for probabilities</li>
            <li>σ(0) = 0.5 - the decision boundary</li>
            <li>Symmetric: σ(-z) = 1 - σ(z)</li>
            <li>Derivative: σ'(z) = σ(z)(1 - σ(z))</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Essential Equations</h2>

        <div className="equation-card">
          <div className="equation-label">Hypothesis Function</div>
          <div className="equation">{"$$h_\\theta(x) = \\sigma(\\theta^T x) = \\frac{1}{1 + e^{-\\theta^T x}}$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Log Loss (Binary Cross-Entropy)</div>
          <div className="equation">{"$$J(\\theta) = -\\frac{1}{m} \\sum_{i=1}^{m} \\left[ y^{(i)} \\log(h_\\theta(x^{(i)})) + (1-y^{(i)}) \\log(1-h_\\theta(x^{(i)})) \\right]$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Gradient Descent Update</div>
          <div className="equation">{"$$\\theta_j := \\theta_j - \\alpha \\frac{1}{m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Decision Rule</div>
          <div className="equation">{"$$\\hat{y} = \\begin{cases} 1 & \\text{if } h_\\theta(x) \\geq 0.5 \\\\ 0 & \\text{if } h_\\theta(x) < 0.5 \\end{cases}$$"}</div>
        </div>
      </section>

      <section>
        <h2>Binary Classification Example</h2>

        <div className="table-container">
          <div className="table-header">Sample Data: Exam Pass/Fail Prediction</div>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Study Hours</th>
                <th>Practice Tests</th>
                <th>P(Pass)</th>
                <th>Prediction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2.5</td>
                <td>1</td>
                <td>0.15</td>
                <td><span className="label-tag label-fail">Fail</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>5.0</td>
                <td>3</td>
                <td>0.48</td>
                <td><span className="label-tag label-fail">Fail</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>6.5</td>
                <td>4</td>
                <td>0.72</td>
                <td><span className="label-tag label-pass">Pass</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>8.0</td>
                <td>5</td>
                <td>0.91</td>
                <td><span className="label-tag label-pass">Pass</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Decision Boundary Visualization</h3>
        <div className="decision-boundary-viz">
          <svg viewBox="0 0 400 300" className="boundary-svg">
            {/* Background regions */}
            <rect x="40" y="20" width="145" height="240" fill="rgba(239, 68, 68, 0.1)"/>
            <rect x="185" y="20" width="175" height="240" fill="rgba(16, 185, 129, 0.1)"/>

            {/* Grid */}
            <defs>
              <pattern id="boundaryGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect x="40" y="20" width="320" height="240" fill="url(#boundaryGrid)"/>

            {/* Axes */}
            <line x1="40" y1="260" x2="360" y2="260" stroke="#333" strokeWidth="1.5"/>
            <line x1="40" y1="20" x2="40" y2="260" stroke="#333" strokeWidth="1.5"/>

            {/* Axis labels */}
            <text x="200" y="285" fontSize="12" fill="#333" textAnchor="middle">Study Hours</text>
            <text x="15" y="140" fontSize="12" fill="#333" textAnchor="middle" transform="rotate(-90, 15, 140)">Practice Tests</text>

            {/* Decision boundary */}
            <line x1="185" y1="20" x2="185" y2="260" stroke="#6366f1" strokeWidth="2" strokeDasharray="6"/>
            <text x="190" y="40" fontSize="10" fill="#6366f1" fontWeight="600">Decision Boundary</text>

            {/* Data points - Fail (red) */}
            <circle cx="70" cy="220" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
            <circle cx="100" cy="180" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
            <circle cx="85" cy="200" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
            <circle cx="130" cy="160" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
            <circle cx="150" cy="140" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>
            <circle cx="120" cy="190" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2"/>

            {/* Data points - Pass (green) */}
            <circle cx="220" cy="120" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>
            <circle cx="260" cy="80" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>
            <circle cx="240" cy="100" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>
            <circle cx="290" cy="60" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>
            <circle cx="320" cy="50" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>
            <circle cx="280" cy="90" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>
            <circle cx="310" cy="70" r="8" fill="#10b981" stroke="#fff" strokeWidth="2"/>

            {/* Legend */}
            <circle cx="60" cy="290" r="6" fill="#ef4444"/>
            <text x="75" y="294" fontSize="10" fill="#333">Fail (y=0)</text>
            <circle cx="150" cy="290" r="6" fill="#10b981"/>
            <text x="165" y="294" fontSize="10" fill="#333">Pass (y=1)</text>
          </svg>
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
            <span>logistic_regression_example.py</span>
          </div>
          <pre><code>{`# Logistic Regression with scikit-learn
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import numpy as np

# Sample data: Study hours and practice tests
X = np.array([
    [2.5, 1], [3.0, 2], [4.0, 2], [4.5, 3],
    [5.0, 3], [5.5, 4], [6.0, 4], [6.5, 4],
    [7.0, 5], [7.5, 5], [8.0, 5], [8.5, 6]
])
y = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1])  # 0=Fail, 1=Pass

# Split and scale data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create and train model
model = LogisticRegression(
    penalty='l2',           # L2 regularization
    C=1.0,                  # Inverse regularization strength
    solver='lbfgs',         # Optimization algorithm
    max_iter=100
)
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)
y_prob = model.predict_proba(X_test_scaled)[:, 1]

# Evaluate
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2%}")
print(f"\\nCoefficients: {model.coef_[0]}")
print(f"Intercept: {model.intercept_[0]:.4f}")
print(f"\\nConfusion Matrix:\\n{confusion_matrix(y_test, y_pred)}")
print(f"\\nClassification Report:\\n{classification_report(y_test, y_pred)}")`}</code></pre>
        </div>
      </section>

      <section>
        <h2>Regularization</h2>
        <p>Regularization helps prevent overfitting by adding a penalty term to the loss function. The two most common types are L1 (Lasso) and L2 (Ridge) regularization.</p>

        <div className="regularization-grid">
          <div className="reg-card">
            <h4>L2 Regularization (Ridge)</h4>
            <div className="equation small">{"$$J(\\theta) + \\lambda \\sum_{j=1}^{n} \\theta_j^2$$"}</div>
            <ul>
              <li>Shrinks coefficients toward zero</li>
              <li>Keeps all features</li>
              <li>Good when all features may be relevant</li>
            </ul>
          </div>
          <div className="reg-card">
            <h4>L1 Regularization (Lasso)</h4>
            <div className="equation small">{"$$J(\\theta) + \\lambda \\sum_{j=1}^{n} |\\theta_j|$$"}</div>
            <ul>
              <li>Can shrink coefficients to exactly zero</li>
              <li>Performs feature selection</li>
              <li>Good for sparse models</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Evaluation Metrics</h2>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-name">Accuracy</div>
            <div className="metric-formula">{"$$\\frac{TP + TN}{TP + TN + FP + FN}$$"}</div>
            <p>Overall correctness</p>
          </div>
          <div className="metric-card">
            <div className="metric-name">Precision</div>
            <div className="metric-formula">{"$$\\frac{TP}{TP + FP}$$"}</div>
            <p>Of predicted positives, how many are correct?</p>
          </div>
          <div className="metric-card">
            <div className="metric-name">Recall</div>
            <div className="metric-formula">{"$$\\frac{TP}{TP + FN}$$"}</div>
            <p>Of actual positives, how many did we find?</p>
          </div>
          <div className="metric-card">
            <div className="metric-name">F1 Score</div>
            <div className="metric-formula">{"$$2 \\cdot \\frac{Precision \\cdot Recall}{Precision + Recall}$$"}</div>
            <p>Harmonic mean of precision and recall</p>
          </div>
        </div>

        <div className="callout">
          <div className="callout-title">Key Considerations</div>
          <p>Logistic regression assumes a linear decision boundary. For non-linear relationships, consider polynomial features, kernel methods, or other algorithms like decision trees or neural networks. Always scale your features when using regularization.</p>
        </div>
      </section>
    </div>
  );
}
