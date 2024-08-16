import firebase from '../firebase.js';
import Service from '../models/serviceModel.js';
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

export const createService = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'servicio'), data);
    res.status(200).send('Service created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await getDocs(collection(db, 'servicio'));
    const serviceArray = [];

    if (services.empty) {
      res.status(400).send('No services found');
    } else {
      services.forEach((doc) => {
        const service = new Service(
          doc.id,
          doc.data().descripcion,
          doc.data().duracion,
          doc.data().nombre,
          doc.data().precio
        );
        serviceArray.push(service);
      });

      res.status(200).send(serviceArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const serviceDoc = doc(db, 'servicio', id);
    const data = await getDoc(serviceDoc);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Service not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const serviceDoc = doc(db, 'servicio', id);
    await updateDoc(serviceDoc, data);
    res.status(200).send('Service updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'servicio', id));
    res.status(200).send('Service deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
