import requests
import time

def post_ticks(cnt):
    url = 'http://127.0.0.1:8000/chat/broadcast/'
    headers = {'Content-Type': 'application/json'}
    data = {
            "updates":[
                {
                    "instrument_token":895745,
                    "ltp":300+cnt
                },
                {
                    "instrument_token":419585,
                    "ltp":110+cnt
                }
            ]

        }
    
    response = requests.post(url, headers=headers, json=data)

cnt=4

while(True):
    time.sleep(0.1)
    post_ticks(cnt)
    cnt+=1