/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button, FlatList, Modal, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function WeeklySchedule({ navigation }) {
  const [breakfast, setBreakfast] = React.useState(null);
  const [lunch, onChangeLunch] = React.useState('Nothing selected');
  const [dinner, onChangeDinner] = React.useState('Nothing selected');

  const [meals, setMeals] = useState(Array.from({ length: 7 }, () => Array.from({ length: 3 }, () => null)));

  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);

  const [modalVisible, setModalVisible] = React.useState(false);

  const [responseData, setResponseData] = useState(null);

  // get all recipes data
  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/getRecipes');
      setResponseData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRecipeAddition = (row, col, item) => {
    console.log(JSON.stringify(item));

    const copy = [...meals];
    copy[row][col] = item;
    setMeals(copy);
    // setBreakfast(item);

    console.log(meals);
    setModalVisible(false);
  };

  const displayRecipes = () => (
    <View>
      {responseData && responseData.map((item) => (
        <TouchableOpacity
          key={item._id}
          style={{
            width: 200, padding: 20, margin: 5, backgroundColor: 'white',
          }}
          onPress={() => {
            handleRecipeAddition(currRow, currCol, item);
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.name}</Text>
          <Text style={{ fontSize: 15, fontWeight: '300' }}>{item.description}</Text>

        </TouchableOpacity>

      ))}

    </View>
  );

  const displayModal = () => (
    <View>
      <View style={styles.centeredView}>

        <Modal
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Recipes!</Text>
              {displayRecipes()}
              <Button
                onPress={() => setModalVisible(false)}
                style={{ width: 200 }}
              >
                <Text>Hide Modal</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>

    </View>
  );

  const handleModal = (row, col) => {
    setModalVisible(true);

    console.log('here');
    console.log(row);
    console.log(col);
    setCurrRow(row);
    setCurrCol(col);
    // console.log(modalVisible);

    return (
      displayModal()
    );
  };

  const displayDay = (day, dayId) => (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: '500' }}>{day}</Text>
      <View style={{ marginTop: 20, flexDirection: 'row' }}>

        {/* Breakfast */}
        <TouchableOpacity
          style={{
            width: 200, backgroundColor: 'white', borderRadius: 20, height: 125, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10,
          }}
          onPress={() => handleModal(dayId, 0)}
        >
          <Text style={{ fontSize: 25, fontWeight: '500' }}>Breakfast</Text>
          {
            meals && meals[dayId][0] != null
              ? <Text>{meals[dayId][0].name}</Text> : <Text>No</Text>
          }

        </TouchableOpacity>

        {/* Lunch */}
        <TouchableOpacity
          style={{
            width: 200, backgroundColor: 'white', borderRadius: 20, height: 125, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10,
          }}
          onPress={() => handleModal(dayId, 1)}
        >
          <Text style={{ fontSize: 25, fontWeight: '500' }}>Lunch</Text>
          {
            meals && meals[dayId][1] != null
              ? <Text>{meals[dayId][1].name}</Text> : <Text>No</Text>
          }
        </TouchableOpacity>

        {/* Dinner */}
        <TouchableOpacity
          style={{
            width: 200, backgroundColor: 'white', borderRadius: 20, height: 125, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10,
          }}
          onPress={() => handleModal(dayId, 2)}

        >
          <Text style={{ fontSize: 25, fontWeight: '500' }}>Dinner</Text>
          {
            meals && meals[dayId][2] != null
              ? <Text>{meals[dayId][2].name}</Text> : <Text>No</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    getData();
  }, [responseData]);

  return (
    <ScrollView style={{ padding: 20 }}>

      {displayDay('Sunday', 0)}
      {displayDay('Monday', 1)}
      {displayDay('Tuesday', 2)}
      {displayDay('Wednesday', 3)}
      {displayDay('Thursday', 4)}
      {displayDay('Friday', 5)}
      {displayDay('Saturday', 6)}
      {displayModal()}
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
