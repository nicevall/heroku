import firebase from '../firebase.js';
import Cliente from '../models/clienteModel.js';
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

export const createCliente = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'cliente'), data);
      res.status(200).send('Cliente creado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getClientes = async (req, res, next) => {
    try {
      const clientes = await getDocs(collection(db, 'cliente'));
      const clienteArray = [];
  
      if (clientes.empty) {
        res.status(400).send('No se encontraron clientes');
      } else {
        clientes.forEach((doc) => {
          const cliente = new Cliente(
            doc.id,
            doc.data().apellido,
            doc.data().celular,
            doc.data().direccion,
            doc.data().fecha_nacimiento,
            doc.data().nombre,
            doc.data().usuario_id
          );
          clienteArray.push(cliente);
        });
  
        res.status(200).send(clienteArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      const cliente = doc(db, 'cliente', id);
      const data = await getDoc(cliente);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const updateCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const cliente = doc(db, 'cliente', id);
      await updateDoc(cliente, data);
      res.status(200).send('Cliente actualizado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'cliente', id));
      res.status(200).send('Cliente eliminado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };