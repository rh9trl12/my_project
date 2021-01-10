from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.myproject  # 'dbsparta'라는 이름의 db를 만듭니다.

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('daily.html')

## API 역할을 하는 부분
@app.route('/own', methods=['POST'])
def write_daily():
    day = request.form['day_by_client']
    routine = request.form['routine_by_client']
    comment = request.form['comment_by_client']

    print(day)
    print(routine)
    print(comment)


    new_daily = {
        'day':  day,
        'routine': routine,
        'comment': comment
    }

    db.myproject.insert_one(new_daily)

    return jsonify({'result': 'success', 'msg': '리뷰 작성 잘 되었음'})

@app.route('/own', methods=['GET'])
def read_daily():
    # 리뷰 db에서 조회 후 내려주는 코딩이 필요하다!

    own = list(db.myproject.find({}, {'_id': 0}))
    return jsonify({
        'result': 'success',
        'msg': '이 요청은 GET!',
        'own': own
    })

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
