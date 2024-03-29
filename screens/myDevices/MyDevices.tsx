import {View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView} from "react-native";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Modal from "../../components/modal";
import {useUserCredentials} from "../../hooks/useUserCredentials/useUserCredentials";
import {deleteDevice, getDevices} from "../../hooks/Endpoints";
import {DeviceProperties} from "../../types/types";

export default function MyDevices({navigation}: any) {
    const {token, devices, setAddDeviceSignal} = useUserCredentials();

    return (
        <>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {devices.length > 0 && devices.map((device, index) => {
                    return (
                        <View style={styles.deviceCard} key={index}>
                            <View>
                                <Text>Device id: {device.device_id}</Text>
                                <Text>Device name: {device.name}</Text>
                            </View>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => {
                                deleteDeviceFromList(token, device.device_id);
                                setAddDeviceSignal(prev => !prev);
                            }}>
                                <Text style={styles.buttonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
            <Modal navigation={navigation} />
        </>

    )
}

function deleteDeviceFromList(
    token:string,
    id:string
) {
    Alert.alert(
        "Usuwanie urządzenia",
        "Czy na pewno chcesz usunąć to urządzenie?",
        [
            {
                text: "Nie",
                style: "cancel"
            },
            {
                text: "Tak",
                onPress: () => {
                    console.log({
                        token,
                        id
                    })
                    deleteDevice(token, id)
                        .then((response) => {
                            console.log(JSON.stringify(response));
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            }
        ]
    )
}

let styles = StyleSheet.create({
    cardsContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100
    },
    deviceCard: {
        backgroundColor: "#fff",
        margin: 10,
        padding: 20,
        width: "80%",
        borderRadius: 10,
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 14,
        color: "white"
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 4
    }
})

