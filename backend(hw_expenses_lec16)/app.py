from flask import Flask, g, jsonify, request, abort

from flask_cors import CORS
import database

app = Flask(__name__)
CORS(app)


def get_db():
    if not hasattr(g, 'db'):
        g.db = database.connect('./db.sqlite')
    return g.db


@app.teardown_appcontext
def close_db(exception):
    if hasattr(g, 'db'):
        database.disconnect(g.db)


@app.route('/v1/expenses', methods=['GET'])
def expenses():
    db = get_db()
    expenses = database.get_expenses(db)
    return jsonify(expenses)


@app.route('/v1/expenses', methods=['POST'])
def add_expense():
    if not request.is_json or 'name' not in request.json:
        abort(400)

    db = get_db()
    database.add_expense(db, request.json['name'])
    return '', 200


@app.route('/v1/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    db = get_db()
    database.delete_expense(db, id)
    return '', 200


if __name__ == '__main__':
    app.run(port=7786, debug=True)