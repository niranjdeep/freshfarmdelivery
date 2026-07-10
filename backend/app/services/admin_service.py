from sqlalchemy.orm import Session

from app.models.admin import Admin
from app.schemas.admin_schema import AdminRegister



# Generate Admin ID

def generate_admin_id(db: Session):

    count = db.query(Admin).count() + 1

    return f"ADM{count:03d}"



# Register Admin

def register_admin(
    db: Session,
    admin_data: AdminRegister
):

    admin_id = generate_admin_id(db)


    new_admin = Admin(

        admin_id=admin_id,

        full_name=admin_data.full_name,

        mobile_number=admin_data.mobile_number,

        email=admin_data.email,

        password=admin_data.password
    )


    db.add(new_admin)

    db.commit()

    db.refresh(new_admin)


    return new_admin





# Admin Login

def admin_login(
    db: Session,
    mobile_number: str,
    password: str
):

    admin = (
        db.query(Admin)
        .filter(
            Admin.mobile_number == mobile_number,
            Admin.password == password
        )
        .first()
    )


    return admin





# Get Admin Profile

def get_admin_profile(
    db: Session,
    admin_id: str
):

    return (
        db.query(Admin)
        .filter(
            Admin.admin_id == admin_id
        )
        .first()
    )