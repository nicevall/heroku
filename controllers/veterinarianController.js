import firebase from '../firebase.js';
import Veterinarian from '../models/veterinarianModel.js';
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

export const createVeterinarian = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'veterinario'), data);
    res.status(200).send('Veterinarian created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getVeterinarians = async (req, res, next) => {
  try {
    const veterinarians = await getDocs(collection(db, 'veterinario'));
    const veterinarianArray = [];

    if (veterinarians.empty) {
      res.status(400).send('No veterinarians found');
    } else {
      veterinarians.forEach((doc) => {
        const veterinarian = new Veterinarian(
          doc.id,
          doc.data().nombre,
          doc.data().apellido,
          doc.data().especialidad,
          doc.data().horario,
          doc.data().licencia,
          doc.data().usuario_id
        );
        veterinarianArray.push(veterinarian);
      });

      res.status(200).send(veterinarianArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getVeterinarian = async (req, res, next) => {
  try {
    const id = req.params.id;
    const veterinarianDoc = doc(db, 'veterinario', id);
    const data = await getDoc(veterinarianDoc);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Veterinarian not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateVeterinarian = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const veterinarianDoc = doc(db, 'veterinario', id);
    await updateDoc(veterinarianDoc, data);
    res.status(200).send('Veterinarian updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteVeterinarian = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'veterinario', id));
    res.status(200).send('Veterinarian deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
