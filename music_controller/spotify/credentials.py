from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Retrieve the credentials
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URL =  os.getenv("REDIRECT_URI")