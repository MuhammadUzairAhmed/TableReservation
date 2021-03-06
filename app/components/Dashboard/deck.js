import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, FlatList, StyleSheet, ScrollView, Modal, TextInput, Picker, Button
    , LayoutAnimation, Platform, UIManager,
} from "react-native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { Container, Header, Content, Card, CardItem, Body, Item, Input, Form } from 'native-base';
import moment, { relativeTimeThreshold } from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import reservationData from './../../common/reservation'
import DeckList from './../deckList'

export default class filteredDeck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isDateTimePickerVisible: false,
            modalVisible: false,
            // expanded: false,
            valuesId: 0,
            prevValueId: 0,
            numColumns: 3,
            name: '',
            contact: '',
            time: '',
            location: '',
            family: '',
            additionalReq: '',
            reservationForm: false,
            refresh: false,
            futureReserve: '',
            expanded1:false,
            justview: '',
            data: [
                {
                    id: 1, key: 'Burcott', color: '#557E77',
                    freeTables: '7/8 free',
                    arrowStatus: false,
                    locId: 1
                },
                {
                    id: 2, key: 'Atlantis', color: '#557E77',
                    freeTables: '8/8 free',
                    arrowStatus: false,
                    locId: 1
                },
                {
                    id: 3, key: 'Executive Hall', color: '#D22424',
                    freeTables: '1/8 free',
                    arrowStatus: false,
                    locId: 1
                },
                {
                    id: 4, key: 'Salsa', color: '#D22424',
                    freeTables: '6/8 free',
                    locId: 2,
                    arrowStatus: false
                },
                {
                    id: 5, key: 'Bistro', color: '#D22424',
                    freeTables: '3/8 free',
                    locId: 2,
                    arrowStatus: false
                },
                {
                    id: 6, key: 'Banthai', color: '#D22424',
                    freeTables: '5/8 free',
                    arrowStatus: false,
                    locId: 1
                },
                {
                    id: 7, key: 'Deck 7', color: '#D22424',
                    freeTables: '3/8 free',
                    locId: 2,
                    arrowStatus: false
                },
                {
                    id: 8, key: 'Deck 8', color: '#D22424',
                    freeTables: '3/8 free',
                    locId: 3,
                    arrowStatus: false
                }
            ],
            tableData: [

                { id: 1, decId: 1, color: '#77EE57', type: 'red apple', time: '1-13-20 4:11 pm', name: 'Atl-1', status: 'confirmed', statusFreeAt: '1 hr 30 mins', seats: 14, tableNo: 32, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 2, decId: 1, color: '#E1E71C', type: 'red apple', time: '12-12-20 8:00 pm', name: 'Btl-1', status: 'pending', statusFreeAt: '1 hr', seats: 8, tableNo: 22, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 3, decId: 1, color: '#DA6A2A', type: 'apple', time: '1-13-20 4:11 pm', name: 'Ctl-1', status: 'cancelled', statusFreeAt: '30 mins', seats: 4, tableNo: 12, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 4, decId: 2, color: '#77EE57', type: 'red apple', time: '1-13-20 4:11 pm', name: 'Dtl-1', status: 'confirmed', statusFreeAt: '30 mins', seats: 9, tableNo: 37, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 5, decId: 2, color: '#77EE57', type: 'red apple', time: '12-12-20 8:00 pm', name: 'Etl-1', status: 'confirmed', statusFreeAt: '2 hrs', seats: 11, tableNo: 72, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 6, decId: 2, color: '#E1E71C', type: 'apple', time: '1-13-20 4:11 pm', name: 'Ftl-1', status: 'pending', statusFreeAt: '1 hr', seats: 10, tableNo: 78, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 7, decId: 2, color: '#DA6A2A', type: 'red apple', time: '12-12-20 8:00 pm', name: 'Gtl-1', status: 'cancelled', statusFreeAt: '45 mins', seats: 18, tableNo: 31, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." },
                { id: 8, decId: 3, color: '#77EE57', type: 'apple', time: '12-12-20 8:00 pm', name: 'Htl-1', status: 'confirmed', statusFreeAt: '30 mins', seats: 24, tableNo: 61, detail: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo." }

            ],
            Locations: [
                { id: 1, location: 'indoor' },
                { id: 2, location: 'outdoor' },
                { id: 3, location: 'sea' }
            ],
            seeAll: true,
            selectedDateTime: '',
            key: '',
            lid: 0,
            sub: {},
            userdat: {},
            timeSlots: [
                { id: 1, guests: 6, name: 'daniyal', time: '00:00', to: '1:00', booked: true, deck: 'salsa', table: 'atl-1', history: 'yesterday' },
                { id: 2, guests: 6, name: 'akhlaq', time: '1:00', to: '2:00', booked: false, deck: 'atlantis', table: 'atl-1', history: 'today' },
                { id: 3, guests: 6, name: 'akhlaq', time: '2:00', to: '3:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 4, guests: 6, name: 'daniyal', time: '3:00', to: '4:00', booked: false, deck: 'Banthai', table: 'atl-1', history: 'today' },
                { id: 5, guests: 6, name: 'daniyal', time: '4:00', to: '5:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 6, guests: 6, name: 'daniyal', time: '5:00', to: '6:00', booked: false, deck: 'Banthai', table: 'atl-1', history: 'today' },
                { id: 7, guests: 6, name: 'daniyal', time: '6:00', to: '7:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 8, guests: 6, name: 'daniyal', time: '7:00', to: '8:00', booked: false, deck: 'Banthai', table: 'atl-1', history: 'today' },
                { id: 9, guests: 6, name: 'daniyal', time: '8:00', to: '9:00', booked: false, deck: 'salsa', table: 'atl-1', history: 'today' },
                { id: 10, guests: 6, name: 'daniyal', time: '9:00', to: '10:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 11, guests: 6, name: 'daniyal', time: '10:00', to: '11:00', booked: false, deck: 'salsa', table: 'atl-1', history: 'today' },
                { id: 12, guests: 6, name: 'daniyal', time: '11:00', to: '12:00', booked: false, deck: 'salsa', table: 'atl-1', history: 'today' },
                { id: 13, guests: 6, name: 'daniyal', time: '12:00', to: '13:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 14, guests: 6, name: 'daniyal', time: '13:00', to: '14:00', booked: false, deck: 'Bistro', table: 'atl-1', history: 'today' },
                { id: 15, guests: 6, name: 'daniyal', time: '14:00', to: '15:00', booked: false, deck: 'Bistro', table: 'atl-1', history: 'today' },
                { id: 16, guests: 6, name: 'daniyal', time: '15:00', to: '16:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 17, guests: 6, name: 'daniyal', time: '16:00', to: '17:00', booked: false, deck: 'salsa', table: 'atl-1', history: 'today' },
                { id: 18, guests: 6, name: 'daniyal', time: '17:00', to: '18:00', booked: false, deck: 'Bistro', table: 'atl-1', history: 'today' },
                { id: 19, guests: 6, name: 'daniyal', time: '18:00', to: '19:00', booked: false, deck: 'Banthai', table: 'atl-1', history: 'today' },
                { id: 20, guests: 6, name: 'daniyal', time: '19:00', to: '20:00', booked: false, deck: 'Banthai', table: 'atl-1', history: 'today' },
                { id: 21, guests: 6, name: 'daniyal', time: '20:00', to: '21:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },
                { id: 22, guests: 6, name: 'daniyal', time: '21:00', to: '22:00', booked: false, deck: 'salsa', table: 'atl-1', history: 'today' },
                { id: 23, guests: 6, name: 'akhlaq', time: '22:00', to: '23:00', booked: true, deck: 'Bistro', table: 'atl-1', history: 'yesterday' },
                { id: 24, guests: 6, name: 'daniyal', time: '23:00', to: '00:00', booked: false, deck: 'burcott', table: 'atl-1', history: 'today' },

            ],
            from: '',
            to: '',
            save: '',
            deckData: [],
            tableDatas: [],
            getFetchedData: [],
            alldata: false,
            expanded: false,
            id: 1,
            itemid:0
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount() {
        this.setState({ justview: this.props.dispView })
        //get Deck data
        reservationData.getDecks()
            .then((res) => { return res.json() })
            .then(data => {
                this.setState({ deckData: data.deck }, () => {
                    this.getTableDatas()
                })

            })

    }
    getTableDatas = () => {
        //get table data
        reservationData.getTableData()
            .then((res) => { return res.json() })
            .then(data => this.setState({ tableDatas: data.table }, () => {

                this.operateData()
            }))
    }
    operateData = () => {
        const { deckData, tableDatas } = this.state

        var arr = [];

        for (var i = 0; i < deckData.length; i++) {
            var value = {}
            var free = 0;
            var total = 0;
            for (var j = 0; j < tableDatas.length; j++) {
                if (deckData[i].id == tableDatas[j].deck_id) {
                    if (tableDatas[j].status == 1) {
                        free++;
                    }
                    total++;
                }
            }
            value.freeTables = free
            value.totalTables = total
            value.name = deckData[i].name
            value.id = deckData[i].id
            value.location = deckData[i].loc_id
            arr.push(value)
        }
        this.setState({ getFetchedData: arr }, () => this.setState({ alldata: true }))
    }
    changeLayout = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded, itemid: id });
    }
    changeLayout1 = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded1: !this.state.expanded});
    }

    getSchedule =(value)=>{
        console.log(value,'getSchedule')
    }
    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }
    getTableData = (data) => {
        console.log(data, 'get table data')
    }
    changeDesign = (item) => {
        console.log(item, 'checked')
    }

    openReservationModal = () => {
        this.setState({ reservationForm: !this.state.reservationForm })
    }
    checkToggle = (isCollapsed, id) => {
        console.log('fdsfdsf', id)
        if (this.state.valuesId == id) {
            this.setState({ valuesId: 0, collapsed: isCollapsed })
        } else {
            this.setState({ valuesId: id, collapsed: isCollapsed })
        }
    }

    setModalVisible(visible, key) {
        if (key == 'closed') {
            this.setState({ modalVisible: visible }, () => {

                this.setState({
                    timeSlots: this.state.timeSlots.filter(item => {
                        if (item.history == 'today') {
                            item.booked = false
                            return item
                        }
                        return item
                    })
                })
            });
        } else {
            this.setState({ modalVisible: visible })
        }
    }

    getInfo = (userData, key, loc, tableData, selectedDateTime, title, People, timeId) => {
        console.log(timeId, 'userdata')
        var selectedDateTime = { selectedDateTime, title, People }
        this.setModalVisible(false)
        this.props.getAllInfo(userData, key, loc, tableData, selectedDateTime, timeId)
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.setState({ selectedDateTime: moment(date).format('MMMM, Do YYYY HH:mm') }, () => {
            console.log(this.state.selectedDateTime)
        })
        this.hideDateTimePicker();
    };
    setInfo = (userData, key, loc, tableData) => {
        this.setState({ userdat: userData, key, lid: loc, sub: tableData }, () => {
            this.gotoEvent()
        })
    }
    getAlldata = () => {
        this.setState({ seeAll: true }, () => {
            setTimeout(() => {
                this.setState({ data: this.state.data, tableData: this.state.tableData })
            }, 2000)
        })
    }
    selectEvent = (id) => {
        if (id.history == 'today') {
            this.setState({
                timeSlots: this.state.timeSlots.filter(item => {
                    if (item.id == id.id) {
                        item.booked = !item.booked
                        return item
                    }
                    return item
                })
            })
        }
    }
    savedData = () => {
        const { userData } = this.props
        let getData = this.state.timeSlots.filter(item => item.history == 'today' && item.booked == true)
        var getlastIndexValue;
        //find lastindexof time
        for (let i = this.state.timeSlots.length - 1; i >= 0; i--) {
            if (this.state.timeSlots[i].history == 'today' && this.state.timeSlots[i].booked == true) {
                getlastIndexValue = this.state.timeSlots[i].time;
                break;
            }
        }
        //find firstindex value for time
        let getFirstTime = this.state.timeSlots.find(item => item.history == 'today' && item.booked == true)
        this.setState({ to: getData.length > 1 ? getlastIndexValue : getFirstTime.to, from: getFirstTime.time }, () => {
            var reserved = {
                deck: this.state.key,
                tableName: this.state.sub.name,
                seats: this.state.sub.seats,
                tableNo: this.state.sub.tableNo,
                time: { from: this.state.from, to: this.state.to },
                userData
            }
            this.setState({ save: reserved }, () => {
                // this.setModalVisible(false, 'saved')
                alert('Table Reserved Succcessfully')
            })
        })
    }
    gotoFormPage = (item) => {
        this.setModalVisible(false, 'saved')
        if (this.state.save != '') {
            this.props.formData(this.state.save)
        }
    }
    gotoEvent = () => {
        var user = this.props.userData
        var deck = this.state.key
        var table = this.state.sub.name
        var seats = this.state.sub.seats
        var tableNo = this.state.sub.tableNo
        var timeSlots = this.state.timeSlots
        var guest = this.state.justview != "editable" ? '' : this.props.userData.guests
        var name = this.state.justview != "editable" ? '' : this.props.userData.name
        var viewData;
        this.state.justview != "editable" ?
            this.props.navigation.navigate('EventCalender', {
                user,
                deck,
                table,
                seats,
                tableNo,
                timeSlots,
                guest,
                name,
                viewData: true
            })
            : this.props.getTimeData(
                user,
                deck,
                table,
                seats,
                tableNo,
                timeSlots,
                guest,
                name
            )
    }
    render() {
        const { userData } = this.props
        const { futureReserve, isDateTimePickerVisible, getFetchedData, tableDatas } = this.state

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                {getFetchedData.map(item => <View>
                    <TouchableOpacity onPress={()=>item.totalTables>0?this.changeLayout(item.id):null} style={styles.notificationBox}>
                        <View style={styles.subnotificationBox}>
                            <View >
                            <Text>{item.name}</Text>
                            </View>
                            <View style={{ }}>
                                <Text style={styles.descriptionForm}>{item.freeTables}/{item.totalTables}</Text>
                            </View>
                            <View style={{ }}>
                                <Text >icon</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                        {tableDatas.map(subitem => 
                            subitem.deck_id == item.id && subitem.deck_id == this.state.itemid? 
                            <TouchableOpacity style={[{ height: this.state.expanded ? null : 0, overflow: 'hidden' }]}>
                                <DeckList
                                booked={false}
                                borderStyle="a b c"
                                itemDeck={item.name}
                                itemTable={subitem.name}
                                keyName="customer Name:" itemName={subitem.name}
                                keyReserved="Reserved from:" itemFrom={subitem.name} itemTo={subitem.name}
                                keyGuests="Guests:" itemGuests={subitem.name}
                                time_id={subitem.time_id}
                                itemReservedTime={subitem.name}
                                checkSchedule={this.getSchedule}
                            />
                            </TouchableOpacity> 
                            
                        : null
           
                        )}
                        
                  

                </View>)}
               
              


                <Modal
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.setModalVisible(false, 'closed')}
                    visible={this.state.modalVisible}>

                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <ScrollView contentContainerStyle={styles.modalInfo}>
                                    <Separator bordered style={{ marginBottom: 20, width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 23 }}>22 JAN 2020</Text>
                                    </Separator>
                                    <Text style={{ fontSize: 20 }}>Deck: {this.state.key}</Text>
                                    <Text style={{ fontSize: 20 }}>Table: {this.state.sub.name}</Text>
                                    <Text style={{ fontSize: 20 }}>Seats: {this.state.sub.seats}</Text>
                                    <Text style={{ fontSize: 20 }}>Table No: {this.state.sub.tableNo}</Text>
                                    <View >
                                        {this.state.timeSlots.map(item => {
                                            return <View style={{ display: 'flex' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ marginRight: 2 }}>
                                                        <Text >{item.time}</Text>
                                                    </View>
                                                    <View style={{ marginLeft: 2, marginTop: 8, backgroundColor: 'black', width: '79%', height: 2 }} />
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                    {this.state.justview == "editable" ? <Button
                                                        title="Reserved"
                                                        style={{ alignItems: 'center', borderRadius: 10 }}
                                                        onPress={() => this.selectEvent(item)}
                                                    /> : null}
                                                    <TouchableOpacity onPress={() => item.booked == true && item.history == 'today' ? this.gotoFormPage(item) : null} style={{ backgroundColor: item.booked == true && item.history == 'today' ? '#B6BBC2' : item.booked == true && item.history == 'yesterday' ? '#6A7280' : 'transparent', width: '79%', height: 50 }} >{item.booked == true && item.history == 'today' ?
                                                        <View style={{ display: 'flex' }}>
                                                            <Text style={{ fontSize: 15 }}>guest:{userData.guests} & name:{userData.name}</Text>
                                                            {/* <Text>{this.state.from} - {this.state.to}</Text> */}
                                                        </View> : item.booked == true && item.history == 'yesterday' ? <Text>guest:{item.guests} & name:{item.name}</Text> : <Text></Text>}</TouchableOpacity>
                                                </View>

                                            </View>
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.popupButtons}>
                                {this.state.justview == "editable" ? <TouchableOpacity onPress={this.savedData} style={[styles.btnClose, { backgroundColor: '#ACC1AD', marginLeft: 2 }]}>
                                    <Text style={styles.txtClose}>Save</Text>
                                </TouchableOpacity> : null}
                                <TouchableOpacity onPress={() => { this.setModalVisible(false, 'closed') }} style={[styles.btnClose, { backgroundColor: '#ACC1AD', marginLeft: 2 }]}>
                                    <Text style={styles.txtClose}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                
                    {this.state.data.map((item) => {
                            return <Collapse key={item.key}
                                onToggle={(isCollapsed) => this.checkToggle(isCollapsed, item.id)}>

                                <CollapseHeader
                                    style={{
                                        marginTop: 10,
                                        backgroundColor: 'white',
                                        shadowColor: 'black',
                                        shadowOpacity: .3,
                                        shadowOffset: {
                                            height: 1,
                                            width: -2
                                        },
                                        elevation: 2,
                                        paddingTop: 5
                                    }}
                                    onPress={() => this.changeDesign(item.id)}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.key}</Text>
                                        <Text>{item.freeTables}</Text>
                                        {this.state.Locations.map((locitem) => locitem.id == item.locId ? <Text>{locitem.location}</Text> : null)}
                                        <Icons name={this.state.valuesId == item.id ? "alpha-v" : "apple-keyboard-control"} size={24} color="black" />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    {this.state.tableData.map((sub) => {
                                        return <TouchableOpacity onPress={() => this.getTableData(sub)}>
                                            <View style={styles.row}>

                                                <View>
                                                    <View style={styles.nameContainer}>
                                                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Table Name:</Text>
                                                        <Text style={styles.mblTxt}>{sub.name}</Text>
                                                    </View>
                                                    <View style={styles.nameContainer}>
                                                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Total Seats:</Text>
                                                        <Text style={styles.mblTxt}>{sub.seats}</Text>
                                                    </View>
                                                    <View style={styles.nameContainer}>
                                                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Table free in:</Text>
                                                        <Text style={styles.mblTxt}>{sub.statusFreeAt}</Text>
                                                    </View>
                                                    <View style={styles.nameContainer}>
                                                        <Text style={[styles.nameTxt, { marginTop: 11 }]} numberOfLines={1} ellipsizeMode="tail">Future Reservation:</Text>
                                                        <Button
                                                            onPress={() => this.setInfo(userData, item.key, item.locId, sub)}
                                                            title="set time"
                                                            color="#689C4E"
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    })}
                                </CollapseBody>
                            </Collapse>
                        })
                    }

                </ScrollView>
                {this.state.justview != "editable" ? <TouchableOpacity onPress={() => this.props.navigation.navigate('Prefrence')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Icon
                        reverse
                        name='ios-add'
                        type='ionicon'
                        color='#C11A2C'
                    />
                </TouchableOpacity> : null}
                 <View style={{ height: this.state.expanded1 ? null : 0, overflow: 'hidden' }}>
                    <View style={{ background: 'white', height: 250 }}></View>
                </View> 
            </View>
        )
    }

}


const styles = StyleSheet.create({
    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#696969"
    },
    about: {
        marginHorizontal: 10
    },
    /************ modals ************/
    popup: {
        backgroundColor: 'white',
        marginTop: 80,
        marginHorizontal: 20,
        borderRadius: 7,
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        marginTop: 0
    },
    popupContent: {
        //alignItems: 'center',
        margin: 5,
        height: 400,
    },
    popupHeader: {
        marginBottom: 45
    },
    popupButtons: {
        marginTop: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: "#eee",
        justifyContent: 'center'
    },
    popupButton: {
        flex: 1,
        marginVertical: 16
    },
    btnClose: {
        height: 'auto',
        padding: 10,
        width: 100,
        borderRadius: 10,
        marginBottom: 5
    },
    modalInfo: {
        justifyContent: 'space-between',
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtClose: {
        textAlign: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    
    notificationBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        backgroundColor: '#DEE3EC',
        borderRadius: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        display: 'flex'
    },
    subnotificationBox: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    
    fakeCard: {
         
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#eeeeee',
        padding: 0,
        borderLeftWidth: 0,

    }
})