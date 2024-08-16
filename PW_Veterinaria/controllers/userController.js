import firebase from '../firebase.js';
import User from '../models/userModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createUser = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'usuario'), data);
      res.status(200).send('Usuario creado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getUsers = async (req, res, next) => {
    try {
      const users = await getDocs(collection(db, 'usuario'));
      const userArray = [];
  
      if (users.empty) {
        res.status(400).send('No se encontraron usuarios');
      } else {
        users.forEach((doc) => {
          const user = new User(
            doc.id,
            doc.data().email,
            doc.data().estado,
            doc.data().fecha_registro,
            doc.data().password_hash,
            doc.data().rol,
            doc.data().ultimo_acceso
          );
          userArray.push(user);
        });
  
        res.status(200).send(userArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = doc(db, 'usuario', id);
      const data = await getDoc(user);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = doc(db, 'usuario', id);
      await updateDoc(user, data);
      res.status(200).send('Usuario actualizado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'usuario', id));
      res.status(200).send('Usuario eliminado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };