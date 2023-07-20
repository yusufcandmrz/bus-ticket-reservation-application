import React, { useEffect, useState } from "react";
import { View, Text, Alert, ToastAndroid } from "react-native";
import styles from "./style";
import cities from "../../../cities";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from "../../components/button/Button";
import { useNavigation } from "@react-navigation/native";

const TicketQuery = () => {

    useEffect(() => {
        Alert.alert("BİLGİLENDİRME", "Seferlerimiz sadece İstanbul-Ankara-İzmir arası gerçekleşmektedir.")
    }, [])

    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState(new Date());
    const [dateTitle, setDateTitle] = useState(date.toLocaleDateString("tr-TR"));
    const [showPicker, setShowPicker] = useState(false);

    const navigation = useNavigation();
    const minDate = new Date();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
        setDateTitle(currentDate.toLocaleDateString("tr-TR"))
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    function handleSearchButton() {
        if (departure == "" || arrival == "") {
            ToastAndroid.show("Lütfen Tüm Alanları Doldurun", ToastAndroid.TOP);
        }
        else if (departure == arrival) {
            ToastAndroid.show("Lütfen Şehirleri Farklı Seçin", ToastAndroid.TOP);
        }
        else {
            const newTripDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            navigation.navigate("Sefer Listesi", { departurePoint: departure, arrivalPoint: arrival, tripDate: newTripDate })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.selectText}>Kalkış Noktası</Text>
                <View style={styles.picker}>
                    <Picker
                        style={{ color: "orange" }}
                        selectedValue={departure}
                        onValueChange={setDeparture}>
                        {Object.keys(cities).map((key) => (
                            <Picker.Item label={cities[key]} value={cities[key]} key={key} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.selectText}>Varış Noktası</Text>
                <View style={styles.picker}>
                    <Picker
                        style={{ color: "orange" }}
                        selectedValue={arrival}
                        onValueChange={setArrival}>
                        {Object.keys(cities).map((key) => (
                            <Picker.Item label={cities[key]} value={cities[key]} key={key} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.selectDateStyle}>
                <Text style={styles.pickerText}>Sefer Tarihi Seçiniz</Text>
                <CustomButton buttonTitle={dateTitle} onPress={showDatepicker} />
                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        minimumDate={minDate}
                    />
                )}
                <View style={styles.button}>
                    <CustomButton buttonTitle={"Ara"} onPress={handleSearchButton} />
                </View>
            </View>
        </View>
    )
}

export default TicketQuery;