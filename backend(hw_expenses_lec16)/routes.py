from flask import jsonify, request, abort

from app import app, get_db
import database


@app.route('/v1/expenses', methods=['GET'])
def expenses():
    db = get_db()
    tasks = database.get_expenses(db)
    return jsonify(tasks)


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

# @app.route('/v1/expenses', methods=['GET'])
# def sum_of_expenses(db):
#     db = get_db()
#     database.sum_of_expenses(db)