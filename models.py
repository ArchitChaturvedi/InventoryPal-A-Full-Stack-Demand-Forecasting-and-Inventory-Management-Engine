from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class DemandUpload(db.Model):
    
    __tablename__ = "DemandUploads"

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(150), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.timezone.utc)

    content = db.Column(db.Text, nullable=True) 

    def __repr__(self):
        return f"<DemandUpload {self.filename} uploaded {self.upload_date}>"

class DemandRecord(db.Model):
    
    __tablename__ = "DemandRecords"

    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('DemandUploads.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    demand = db.Column(db.Float, nullable=False)

    upload = db.relationship("DemandUpload", backref=db.backref("records", lazy=True))

    def __repr__(self):
        return f"<DemandRecord {self.date}: {self.demand}>"
