import os
os.environ['DATABASE_URL'] = 'sqlite:///./test_auth.db'

from fastapi.testclient import TestClient
from backend.main import app
from backend.database import engine
from backend import models

models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

client = TestClient(app)

register_payload = {
    'full_name': 'Test User',
    'mobile_number': '7777777777',
    'email': 'testuser@example.com',
    'village': 'Test Village',
    'password': 'Password123',
    'confirm_password': 'Password123'
}
resp = client.post('/auth/register', json=register_payload)
print('register status', resp.status_code, resp.json())

login_payload = {'mobile_number': '7777777777', 'password': 'Password123'}
resp2 = client.post('/auth/login', json=login_payload)
print('login status', resp2.status_code, resp2.json())

token = resp2.json().get('access_token')
headers = {'Authorization': f'Bearer {token}'}
resp3 = client.get('/customer/profile', headers=headers)
print('profile status', resp3.status_code, resp3.json())

otp_req = client.post('/auth/request-otp', json={'mobile_number': '7777777777'})
print('otp request status', otp_req.status_code, otp_req.json())
otp_code = otp_req.json().get('otp_code')

otp_verify = client.post('/auth/verify-otp', json={'mobile_number': '7777777777', 'otp_code': otp_code})
print('otp verify status', otp_verify.status_code, otp_verify.json())

otp_token = otp_verify.json().get('access_token')
headers_otp = {'Authorization': f'Bearer {otp_token}'}
resp4 = client.get('/customer/dashboard', headers=headers_otp)
print('dashboard status', resp4.status_code, resp4.json())
