import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [valueInput, setValueInput] = React.useState("");
  const [dataList, setDataList] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState("");
  const handelSubmit = () => {
    setDataList([
      { id: Date.now() + Math.random(), value: valueInput },
      ...dataList,
    ]);
    setValueInput("");
  };
  const handelRemove = (id) => {
    const dataListNew = [];
    dataList.filter((item) => {
      if (item.id !== id) {
        dataListNew.push(item);
      }
    });
    setDataList(dataListNew);
  };
  const handelEdit = (value, id) => {
    setValueInput(value);
    setIdEdit(id);
    setEdit(true);
  };
  const handelEditSubmit = () => {
    const dataListNew = [];
    dataList.filter((item) => {
      if (item.id === idEdit) {
        dataListNew.push({ ...item, value: valueInput });
      } else dataListNew.push(item);
    });
    setDataList(dataListNew);
    setValueInput("");
    setEdit(false);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.2,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          value={valueInput}
          onChangeText={(value) => {
            setValueInput(value);
          }}
          style={{
            width: "90%",
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            fontSize: 15,
          }}
          placeholder="Enter todo ... "
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              handelSubmit();
            }}
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 3,
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Add todo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={edit ? false : true}
            onPress={() => {
              handelEditSubmit();
            }}
            style={{
              marginLeft: 10,
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 3,
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Edit todo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 0.9,
          width: "100%",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            width: "90%",
          }}
        >
          <FlatList
            style={{ width: "100%" }}
            data={dataList}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  marginTop: 10,
                  padding: 15,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 35,
                        borderWidth: 1,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>{index + 1}</Text>
                    </View>
                    <Text style={{ marginLeft: 10, maxWidth: 200 }}>{item.value}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ padding: 5, borderWidth: 1, height: "100%" }}
                      onPress={() => {
                        handelRemove(item.id);
                      }}
                    >
                      <Text>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 5,
                        borderWidth: 1,
                        height: "100%",
                        marginLeft: 5,
                      }}
                      onPress={() => {
                        handelEdit(item.value, item.id);
                      }}
                    >
                      <Text>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
