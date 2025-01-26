import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

