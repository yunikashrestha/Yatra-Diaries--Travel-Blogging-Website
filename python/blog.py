import pickle
import re
import string
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import math
def preprocess_text(text, use_ngrams=False, n_gram_range=(1, 1)):
    
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
def load_model_params(filename):
    """Load the trained model parameters from a file."""
    with open(filename, "rb") as f:
        data = pickle.load(f)
    
    return (
        data["vocabulary"],
        data["class_priors"],
        data["word_probabilities"],
        data["total_words_in_class"]
    )
def predict_single_blog(doc_tokens, vocabulary, class_priors, word_probabilities, total_words_in_class, smoothing_alpha=1.0):
   
    best_class = None
    max_log_posterior = -float('inf')

    for c, prior_prob in class_priors.items():
        
        log_posterior = math.log(prior_prob)
        
        for word_token in doc_tokens:
            
            if word_token in vocabulary:
               
                word_prob = word_probabilities[c].get(word_token, smoothing_alpha / total_words_in_class[c])
                log_posterior += math.log(word_prob)

        if log_posterior > max_log_posterior:
            max_log_posterior = log_posterior
            best_class = c
    return best_class

def predict(blog):
    model_filename = "blog_categorization.pkl"

   
    try:
        vocabulary_loaded, class_priors_loaded, word_probabilities_loaded, total_words_in_class_loaded = load_model_params(model_filename)
              
        new_blog_text = blog
        
        USE_NGRAMS_PREDICT = True 
        NGRAM_RANGE_PREDICT = (1, 2) 

        processed_new_blog_tokens = preprocess_text(new_blog_text, use_ngrams=USE_NGRAMS_PREDICT, n_gram_range=NGRAM_RANGE_PREDICT)
      
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
