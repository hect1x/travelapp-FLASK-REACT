from exts import db

"""
RUN
flask db upgrade
flask db migrate -m "message wtv"
"""

# User model
"""
class User:
    id:integer
    username:string
    email:string
    password:string
"""

class User(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    username=db.Column(db.String(25), nullable=False, unique = True)
    email=db.Column(db.String(80), nullable= False)
    password=db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

"""
class Plane:
    id:
    company:
    destination:
    price:
"""

class Plane(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    company=db.Column(db.String(), nullable=False)
    destination=db.Column(db.Text(), nullable=False)
    price=db.Column(db.Integer(), nullable=False)


    def __repr__(self):
        return f"<Plane {self.title}>"
    

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, company, destination, price):
        self.company = company
        self.destination = destination
        self.price = price

        db.session.commit()

"""
class Train:
    id:
    company:
    destination:
    price:
"""

class Train(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    company=db.Column(db.String(), nullable=False)
    destination=db.Column(db.Text(), nullable=False)
    price=db.Column(db.Integer(), nullable=False)


    def __repr__(self):
        return f"<Train {self.title}>"
    

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, company, destination, price):
        self.company = company
        self.destination = destination
        self.price = price

        db.session.commit()

"""
class Hotel:
    id:
    company:
    location:
    price:
"""

class Hotel(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    company=db.Column(db.String(), nullable=False)
    location=db.Column(db.Text(), nullable=False)
    price=db.Column(db.Integer(), nullable=False)


    def __repr__(self):
        return f"<Hotel {self.title}>"
    

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, company, location, price):
        self.company = company
        self.location = location
        self.price = price

        db.session.commit()