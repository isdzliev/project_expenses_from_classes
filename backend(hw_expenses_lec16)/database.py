import sqlite3


def connect(url):
    conn = sqlite3.connect(url)
    conn.row_factory = sqlite3.Row
    return conn


def disconnect(db):
    db.close()


def get_expenses(db):
    cursor = db.execute('SELECT id, name, expense FROM expenses LIMIT 100')
    rows = cursor.fetchall()  # важно, в production надо использовать limit
    # result = []
    # for row in rows:
    #     result.append({'id': row['id'], 'name': row['name']})
    # return result

    return [{'id': row['id'], 'name': row['name'], 'expense': row['expense']} for row in rows]


def add_expense(db, name):
    db.execute(
        'INSERT INTO expenses(name, expense) VALUES (?, ?)',
        ['name'], ['expense']
    )
    db.commit()


def delete_expense(db, id):
    db.execute(
        'DELETE FROM expenses WHERE id = :id',
        {'id': id}
    )
    db.commit()

def sum_of_expenses(db):
    cursor = db.execute('SELECT SUM(expense) as total_expenses FROM expenses')
    rows = cursor.fetchall()
    return [{'total expenses': rows}]
