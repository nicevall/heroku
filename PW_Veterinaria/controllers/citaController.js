import firebase from '../firebase.js';
import Cita from '../models/citaModel.js';
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

export const createCita = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'cita'), data);
      res.status(200).send('Cita creada exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getCitas = async (req, res, next) => {
    try {
      const citas = await getDocs(collection(db, 'cita'));
      const citaArray = [];
  
      if (citas.empty) {
        res.status(400).send('No se encontraron citas');
      } else {
        citas.forEach((doc) => {
          const cita = new Cita(
            doc.id,
            doc.data().estado,
            doc.data().fecha_hora,
            doc.data().mascota_id,
            doc.data().motivo,
            doc.data().veterinario_id
          );
          citaArray.push(cita);
        });
  
        res.status(200).send(citaArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getCita = async (req, res, next) => {
    try {
      const id = req.params.id;
      const cita = doc(db, 'cita', id);
      const data = await getDoc(cita);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Cita no encontrada');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const updateCita = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const cita = doc(db, 'cita', id);
      await updateDoc(cita, data);
      res.status(200).send('Cita actualizada exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteCita = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'cita', id));
      res.status(200).send('Cita eliminada exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };