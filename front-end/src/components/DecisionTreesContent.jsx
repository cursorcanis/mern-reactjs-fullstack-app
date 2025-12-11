import { useEffect } from 'react';
import './DecisionTreesContent.css';

export default function DecisionTreesContent() {
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
    <div className="decision-trees-article">
      <div className="article-header">
        <div className="breadcrumb">ML Fundamentals / Supervised Learning</div>
        <h1>Decision Trees</h1>
        <p className="subtitle">Tree-structured models for interpretable classification and regression through recursive feature splitting</p>
      </div>

      <section>
        <h2>Overview</h2>
        <p>Decision trees are powerful, interpretable machine learning models that make predictions by learning simple decision rules inferred from data features. They recursively split the data based on feature thresholds, creating a tree structure where each internal node represents a test on a feature, each branch represents the outcome of that test, and each leaf node represents a class label or continuous value.</p>
        <p>The key strength of decision trees lies in their interpretability—you can trace the path from root to leaf to understand exactly why a prediction was made. Splits are chosen to maximize purity gain, measured through metrics like information gain or Gini reduction.</p>
      </section>

      <section>
        <h2>Essential Equations</h2>

        <div className="equation-card">
          <div className="equation-label">Entropy</div>
          <div className="equation">{"$$H(S) = -\\sum_{c} p_c \\log_2 p_c$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Information Gain</div>
          <div className="equation">{"$$IG(S, A) = H(S) - \\sum_{v \\in A} \\frac{|S_v|}{|S|} H(S_v)$$"}</div>
        </div>

        <div className="equation-card">
          <div className="equation-label">Gini Impurity</div>
          <div className="equation">{"$$G(S) = 1 - \\sum_{c} p_c^2$$"}</div>
        </div>
      </section>

      <section>
        <h2>Sample Dashboard</h2>

        <div className="table-container">
          <div className="table-header">Sample Classification Data</div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Feature 1</th>
                <th>Feature 2</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>5.1</td>
                <td>3.5</td>
                <td><span className="label-tag label-0">Class 0</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>4.9</td>
                <td>3.0</td>
                <td><span className="label-tag label-0">Class 0</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>6.2</td>
                <td>2.8</td>
                <td><span className="label-tag label-1">Class 1</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>5.9</td>
                <td>3.0</td>
                <td><span className="label-tag label-1">Class 1</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Decision Tree Visualization</h3>
        <div className="tree-diagram">
          <svg className="tree-svg" viewBox="0 0 400 220">
            {/* Root node */}
            <rect x="150" y="10" width="100" height="40" rx="8" fill="#4a7c59"/>
            <text x="200" y="35" textAnchor="middle" fill="white" fontFamily="system-ui" fontSize="11">Feature1 &le; 5.5?</text>

            {/* Branches */}
            <line x1="175" y1="50" x2="100" y2="90" stroke="#2d4a2d" strokeWidth="2"/>
            <line x1="225" y1="50" x2="300" y2="90" stroke="#2d4a2d" strokeWidth="2"/>

            {/* Yes/No labels */}
            <text x="125" y="70" fill="#5c4033" fontSize="11" fontWeight="600">Yes</text>
            <text x="260" y="70" fill="#5c4033" fontSize="11" fontWeight="600">No</text>

            {/* Left child */}
            <rect x="50" y="90" width="100" height="40" rx="8" fill="#7ba05b"/>
            <text x="100" y="115" textAnchor="middle" fill="white" fontFamily="system-ui" fontSize="11">Feature2 &le; 3.2?</text>

            {/* Right child (leaf) */}
            <rect x="250" y="90" width="100" height="40" rx="8" fill="#c9e4ca"/>
            <text x="300" y="115" textAnchor="middle" fill="#1a2e1a" fontFamily="system-ui" fontSize="11">Class 1 (n=2)</text>

            {/* Left child branches */}
            <line x1="75" y1="130" x2="50" y2="170" stroke="#2d4a2d" strokeWidth="2"/>
            <line x1="125" y1="130" x2="150" y2="170" stroke="#2d4a2d" strokeWidth="2"/>

            <text x="50" y="155" fill="#5c4033" fontSize="11" fontWeight="600">Yes</text>
            <text x="145" y="155" fill="#5c4033" fontSize="11" fontWeight="600">No</text>

            {/* Leaf nodes */}
            <rect x="0" y="170" width="100" height="40" rx="8" fill="#c9e4ca"/>
            <text x="50" y="195" textAnchor="middle" fill="#1a2e1a" fontFamily="system-ui" fontSize="11">Class 0 (n=1)</text>

            <rect x="100" y="170" width="100" height="40" rx="8" fill="#c9e4ca"/>
            <text x="150" y="195" textAnchor="middle" fill="#1a2e1a" fontFamily="system-ui" fontSize="11">Class 0 (n=1)</text>
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
            <span>decision_tree_example.py</span>
          </div>
          <pre><code>{`# Decision Tree Classification with scikit-learn
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

# Sample data
X = [[5.1, 3.5], [4.9, 3.0], [6.2, 2.8], [5.9, 3.0]]
y = [0, 0, 1, 1]

# Create and train the model
clf = DecisionTreeClassifier(
    criterion='gini',
    max_depth=3,
    min_samples_split=2
)
clf.fit(X, y)

# Make predictions
predictions = clf.predict(X)
print(f"Accuracy: {accuracy_score(y, predictions):.2%}")

# Visualize the tree
plt.figure(figsize=(12, 8))
plot_tree(clf, filled=True, feature_names=['Feature 1', 'Feature 2'])
plt.show()`}</code></pre>
        </div>

        <div className="callout">
          <div className="callout-title">Key Considerations</div>
          <p>Apply pruning techniques (max_depth, min_samples_leaf) to prevent overfitting. Consider using ensemble methods like Random Forest for improved generalization.</p>
        </div>
      </section>
    </div>
  );
}
