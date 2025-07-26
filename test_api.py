import requests

BASE_URL = "http://localhost:8080"  # ✅ Change this if needed

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    if passed:
        print(f"{test_name}: ✅ PASSED")
    else:
        print(f"{test_name}: ❌ FAILED")
        if request_data:
            print(f"  Request: {request_data}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")

def test_register_user():
    payload = {"username": "puja", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/register", json=payload)
    passed = res.status_code in [201, 409]
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)

def test_login():
    payload = {"username": "puja", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.cookies.get("token")
            passed = token is not None
        except Exception:
            passed = False
    print_result("Login Test", passed, 200, res.status_code, payload, res.text)
    return res.cookies if passed else None

def test_add_product(cookies):
    payload = {
        "name": "Phone",
        "type": "Electronics",
        "sku": "PHN-001",
        "image_url": "https://example.com/phone.jpg",
        "description": "Latest Phone",
        "quantity": 5,
        "price": 999.99
    }
    res = requests.post(f"{BASE_URL}/products", json=payload, cookies=cookies)
    passed = res.status_code == 201
    if passed:
        print("Add Product: ✅ PASSED")
        try:
            return res.json().get("product_id")
        except Exception:
            return None
    else:
        print_result("Add Product", False, 201, res.status_code, payload, res.text)
        return None

def test_update_quantity(cookies, product_id, new_quantity):
    payload = {"quantity": new_quantity}
    res = requests.put(f"{BASE_URL}/products/{product_id}/quantity", json=payload, cookies=cookies)
    passed = res.status_code == 200
    if passed:
        try:
            updated_info = res.json()
            print(f"Update Quantity: ✅ PASSED. New Quantity: {updated_info.get('quantity')}")
        except:
            print("Update Quantity: ✅ PASSED (No JSON body)")
    else:
        print_result("Update Quantity", False, 200, res.status_code, payload, res.text)

def test_get_products(cookies, expected_quantity):
    res = requests.get(f"{BASE_URL}/products", cookies=cookies)
    if res.status_code != 200:
        print_result("Get Products", False, 200, res.status_code, None, res.text)
        return
    try:
        products = res.json()
    except:
        print("❌ Get Products: Invalid JSON")
        return
    phone_products = [p for p in products if p.get("name") == "Phone"]
    if not phone_products:
        print("Get Products: ❌ FAILED (No 'Phone' product found)")
        return
    actual_quantity = phone_products[0].get("quantity")
    if actual_quantity == expected_quantity:
        print(f"Get Products: ✅ PASSED (Quantity = {actual_quantity})")
    else:
        print("Get Products: ❌ FAILED")
        print(f"  Expected Quantity: {expected_quantity}, Got: {actual_quantity}")
        print(f"  Response Body: {products}")

def run_all_tests():
    test_register_user()
    cookies = test_login()
    if not cookies:
        print("❌ Login failed. Skipping remaining tests.")
        return
    product_id = test_add_product(cookies)
    if not product_id:
        print("❌ Product creation failed. Skipping remaining tests.")
        return
    new_quantity = 15
    test_update_quantity(cookies, product_id, new_quantity)
    test_get_products(cookies, new_quantity)

if __name__ == "__main__":
    run_all_tests()
