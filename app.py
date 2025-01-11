import csv
import json
from flask import Flask, jsonify

# Create an instance of the Flask class
app = Flask(__name__)

# Route to display credit score data from a CSV file
@app.route('/api/credit-score', methods=['GET'])
def get_credit_scores_from_csv():
    # List to store the CSV data as a list of dictionaries
    credit_scores_data = []
    
    # Read data from the CSV file
    try:
        with open('credit_scores.csv', mode='r') as file:
            # Use csv.DictReader to read each row as a dictionary
            csv_reader = csv.DictReader(file)
            
            # Convert each row in the CSV to a dictionary and append it to the list
            for row in csv_reader:
                credit_scores_data.append(row)
    
    except FileNotFoundError:
        return jsonify({"error": "CSV file not found"}), 404
    except csv.Error:
        return jsonify({"error": "Error reading CSV file"}), 500
    
    # Return the converted data as JSON response
    return jsonify(credit_scores_data)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
