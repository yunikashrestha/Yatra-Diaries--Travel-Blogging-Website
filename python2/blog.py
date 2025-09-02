import pickle
import re
import string
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import math
def preprocess_text(text, use_ngrams=False, n_gram_range=(1, 1)):
    """
    Cleans and preprocesses text: lowercasing, punctuation removal,
    number removal, stop word removal, and tokenization.
    Optionally generates n-grams.
    """
    if not isinstance(text, str):
        text = ""
        
    text = text.lower()
    text = re.sub(f'[{re.escape(string.punctuation)}]', '', text)
    text = re.sub(r'\d+', '', text)
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word not in stop_words and len(word) > 1]

    if use_ngrams:
        all_ngrams = []
        for n in range(n_gram_range[0], n_gram_range[1] + 1):
            if n == 1:
                all_ngrams.extend(filtered_tokens)
            elif n > 1:
                for i in range(len(filtered_tokens) - n + 1):
                    all_ngrams.append("_".join(filtered_tokens[i:i+n]))
        return all_ngrams
    return filtered_tokens
def load_model_params(filename="naive_bayes_model_params.pkl"):
    """Load the trained model parameters from a file."""
    with open(filename, "rb") as f:
        data = pickle.load(f)
    # print(f"Model parameters loaded from {filename}")
    return (
        data["vocabulary"],
        data["idf_scores"],
        data["class_priors"],
        data["word_probabilities"],
        data["total_words_in_class"]
    )
def predict_single_blog(doc_tokens, vocabulary, class_priors, word_probabilities, total_words_in_class, smoothing_alpha=1.0):
    """
    Predicts the class label for a single document.
    doc_tokens: list of preprocessed tokens for the document.
    vocabulary: The global vocabulary (OrderedDict).
    class_priors: Dictionary of class prior probabilities.
    word_probabilities: Dictionary of word probabilities P(word | class).
    total_words_in_class: Dictionary of total word counts per class (for smoothing).
    smoothing_alpha: Laplace smoothing parameter.
    Returns: The predicted class label.
    """
    best_class = None
    max_log_posterior = -float('inf')

    for c, prior_prob in class_priors.items():
        # Use log probabilities to avoid underflow
        log_posterior = math.log(prior_prob)
        
        for word_token in doc_tokens:
            # Only consider words present in the training vocabulary
            if word_token in vocabulary:
                # Get P(word | class) for this word in this class
                word_prob = word_probabilities[c].get(word_token, smoothing_alpha / total_words_in_class[c])
                log_posterior += math.log(word_prob)

        if log_posterior > max_log_posterior:
            max_log_posterior = log_posterior
            best_class = c
    return best_class

def predict(blog):
    model_filename = "blog_categorization.pkl"

    #Load the trained parameters
    try:
        vocabulary_loaded, idf_scores_loaded, class_priors_loaded, word_probabilities_loaded, total_words_in_class_loaded = load_model_params(model_filename)
        # print("Model parameters loaded successfully!")

        # Define the new blog content you want to predict
        new_blog_text = blog
        # You should use the same n-gram settings as during training
        USE_NGRAMS_PREDICT = True # Set this to True if you trained with n-grams
        NGRAM_RANGE_PREDICT = (1, 2) # Set this to the range used during training

        # print(f"\nNew blog content: '{new_blog_text}'")

        # Preprocess the new blog text using the same function and settings
        processed_new_blog_tokens = preprocess_text(new_blog_text, use_ngrams=USE_NGRAMS_PREDICT, n_gram_range=NGRAM_RANGE_PREDICT)
        # print(f"Processed tokens for new blog: {processed_new_blog_tokens[:10]}...") # Show first few tokens

        # Make a prediction using the loaded parameters
        prediction_for_new_blog = predict_single_blog(
            processed_new_blog_tokens,
            vocabulary_loaded,
            class_priors_loaded,
            word_probabilities_loaded,
            total_words_in_class_loaded
        )
        return prediction_for_new_blog

    except FileNotFoundError:
        return (f"Error: Model parameters file '{model_filename}' not found. Please ensure you have run the training pipeline and saved the model parameters.")
    except Exception as e:
        return (f"An error occurred while loading or predicting: {e}")
