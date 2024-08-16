import firebase from '../firebase.js';
import Pet from '../models/petModel.js';
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

export const createPet = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'mascota'), data);
    res.status(200).send('Pet created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getPets = async (req, res, next) => {
  try {
    const pets = await getDocs(collection(db, 'mascota'));
    const petArray = [];

    if (pets.empty) {
      res.status(400).send('No pets found');
    } else {
      pets.forEach((doc) => {
        const pet = new Pet(
          doc.id,
          doc.data().especie,
          doc.data().fecha_nacimiento,
          doc.data().historial_medico,
          doc.data().nombre,
          doc.data().propietario_id,
          doc.data().raza
        );
        petArray.push(pet);
      });

      res.status(200).send(petArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getPet = async (req, res, next) => {
  try {
    const id = req.params.id;
    const petDoc = doc(db, 'mascota', id);
    const data = await getDoc(petDoc);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Pet not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const petDoc = doc(db, 'mascota', id);
    await updateDoc(petDoc, data);
    res.status(200).send('Pet updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'mascota', id));
    res.status(200).send('Pet deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
