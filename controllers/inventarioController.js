import firebase from '../firebase.js';
import Inventario from '../models/inventarioModel.js';
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

export const createInventario = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'inventario'), data);
      res.status(200).send('Item de inventario creado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getInventarios = async (req, res, next) => {
    try {
      const inventarios = await getDocs(collection(db, 'inventario'));
      const inventarioArray = [];
  
      if (inventarios.empty) {
        res.status(400).send('No se encontraron items en el inventario');
      } else {
        inventarios.forEach((doc) => {
          const inventario = new Inventario(
            doc.id,
            doc.data().cantidad,
            doc.data().fecha_vencimiento,
            doc.data().nombre,
            doc.data().proveedor,
            doc.data().tipo,
            doc.data().unidad
          );
          inventarioArray.push(inventario);
        });
  
        res.status(200).send(inventarioArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getInventario = async (req, res, next) => {
    try {
      const id = req.params.id;
      const inventario = doc(db, 'inventario', id);
      const data = await getDoc(inventario);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Item de inventario no encontrado');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const updateInventario = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const inventario = doc(db, 'inventario', id);
      await updateDoc(inventario, data);
      res.status(200).send('Item de inventario actualizado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteInventario = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'inventario', id));
      res.status(200).send('Item de inventario eliminado exitosamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };