
import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';
import AddCar from './add.cars';
import { Cars_Managment, MangementToken } from '../../src/service'
import CardCar from './ViewCars'
// import {CheckBox} from 'react-native-elements';

export default function Cars(props) {
    const [active, setactive] = useState(true)
    const [list, setlist] = useState([])
    const getList = async () => {

        var list = await Cars_Managment.ListCars({
            "action": "mycars",
            "token": await MangementToken.GetConfigSession()
        })
        if (list) {
            setactive(false)
            setlist(list)
        }else{
            setactive(false)

        }
        console.log(list)

    }

    useEffect(() => {
        getList()


    }, [])

   
    return (
        <View style={{ flex: 1 , padding:5}} >
            <ScrollView>
                <Text
                    style={{
                        fontSize: 26,
                        color: Colors.black,
                        textAlign: 'center',
                        marginBottom: 30,
                        marginTop: 10,
                    }}>
                   ({list.length}): vehicle list
                </Text>
                <AddCar refresh={() => getList()} />
                {active && <ActivityIndicator size="large" color="#00ff00" />}

                <FlatList
                    data={list}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    refreshControl={<RefreshControl refreshing={active} onRefresh={() => getList()} />}
                    renderItem={({ item }) => (
                        <CardCar item={item} props={props} refresh={() => getList()} />
                    )} />
                    </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#dcdcdc',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'space-between',

    },
    pic: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: 270,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 15,

    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    end: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,

    },
    icon: {
        height: 28,
        width: 28,
    }
});

