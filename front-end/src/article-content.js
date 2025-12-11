const articles = [
    {
        name: 'decision-trees',
        title: 'Decision Trees',
        subtitle: 'Tree-structured models for interpretable classification and regression through recursive feature splitting',
        category: 'ML Fundamentals / Supervised Learning',
        isRichContent: true,
        content: [
            `Decision trees are powerful, interpretable machine learning models that make predictions by learning simple decision rules inferred from data features. They recursively split the data based on feature thresholds, creating a tree structure where each internal node represents a test on a feature, each branch represents the outcome of that test, and each leaf node represents a class label or continuous value.`,
            `The key strength of decision trees lies in their interpretability—you can trace the path from root to leaf to understand exactly why a prediction was made. Splits are chosen to maximize purity gain, measured through metrics like information gain or Gini reduction.`,
        ]
    },
    {
        name: 'logistic-regression',
        title: 'Logistic Regression',
        subtitle: 'A probabilistic classification algorithm that models the probability of a binary outcome using the logistic (sigmoid) function',
        category: 'ML Fundamentals / Supervised Learning',
        isRichContent: true,
        content: [
            `Despite its name, Logistic Regression is a classification algorithm, not a regression algorithm. It predicts the probability that an instance belongs to a particular class by applying the logistic (sigmoid) function to a linear combination of input features.`,
            `Logistic Regression is widely used in many fields including medicine, marketing, finance, and natural language processing. Its popularity stems from its simplicity, interpretability, and efficiency.`,
        ]
    },
    {
        name: 'kmeans-clustering',
        title: 'K-Means Clustering',
        subtitle: 'A partitioning algorithm that divides data into K distinct, non-overlapping clusters by minimizing within-cluster variance',
        category: 'ML Fundamentals / Unsupervised Learning',
        isRichContent: true,
        content: [
            `K-Means is one of the most popular unsupervised machine learning algorithms used for clustering analysis. Unlike supervised learning, clustering doesn't require labeled data—instead, it discovers natural groupings within the data based on similarity.`,
            `K-Means is widely used in customer segmentation, image compression, anomaly detection, document clustering, and as a preprocessing step for other algorithms. Its simplicity, scalability, and speed make it a go-to choice for exploratory data analysis.`,
        ]
    },
];

export default articles;