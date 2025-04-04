import {View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import React, {FC, useState} from 'react';
import {navigate} from '../../utils/NavigationUtils';
import {ROUTES} from '../../navigation/Routes';
import LinearGradient from 'react-native-linear-gradient';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import DatePickerModel from '../ui/DatePickerModel';
import LocationPickerModel from '../ui/LocationPickerModel';

const Search: FC = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationType, setLocationType] = useState<'from' | 'to'>('from');
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleLocationSet = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom(location);
      if (location === to) {
        setTo(null);
      }
    } else {
      setTo(location);
    }
  };

  const handleSerachBuses = () => {
    if (!from || !to) {
      Alert.alert(
        'Missing Infromation',
        'Please select both departure and destination locations.',
      );
      return;
    }
    if (from === to) {
      Alert.alert(
        'Invalid Selection',
        'Departure and destination locations cannot be the same.',
      );
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      Alert.alert(
        'Invalid Date',
        'Please select a future date for your journey.',
      );
      return;
    }
    navigate(ROUTES.BUSLIST, {item: {from, to, date}});
  };

  return (
    <View className="rounded-b-3xl overflow-hidden">
      <LinearGradient
        colors={['#78B0E6', '#FFFFFF']}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}>
        <View className="p-4">
          <View className="my-4 border border-1 z-20 bg-white rounded-md border-gray-600">
            <TouchableOpacity
              onPress={() => {
                setLocationType('from');
                setShowLocationPicker(true);
              }}
              className="p-4 flex-row gap-4 items-center">
              <Image
                className="w-6 h-6"
                source={require('../../assets/images/bus.png')}
              />
              <Text className="w-[90%] text-lg font-okra text-gray-600">
                {from || 'From'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLocationType('to');
                setShowLocationPicker(true);
              }}
              className="p-4 border-t-[1px] border-b-[1px] border-gray-400 flex-row gap-4 items-center">
              <Image
                className="w-6 h-6"
                source={require('../../assets/images/bus.png')}
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {to || 'To'}
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center p-2 justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="p-2 mr-2 rounded-lg bg-secondary"
                  onPress={() => setDate(new Date())}>
                  <Text className="font-bold text-sm font-okra">Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 rounded-lg bg-secondary"
                  onPress={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                  }}>
                  <Text className="font-bold text-sm font-okra">Tomorrow</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="flex-row items-center">
                <View className="mr-3">
                  <Text className="text-sm font-normal font-okra text-gray-600">
                    Date of Journey
                  </Text>
                  <Text className="text-md font-bold font-okra text-gray-900">
                    {date?.toDateString()}
                  </Text>
                </View>
                <CalendarDaysIcon color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSerachBuses}
            className="bg-tertiary p-3 rounded-xl my-2 flex-row items-center justify-center gap-2">
            <MagnifyingGlassIcon color={'#fff'} size={22} />
            <Text className="font-okra font-bold text-white text-lg">
              Search Buses
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/sideBusAB.jpg')}
            className="h-40 rounded-lg my-4 w-full"
          />
        </View>
      </LinearGradient>
      {showDatePicker && (
        <DatePickerModel
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={setDate}
          selectedDate={date}
        />
      )}
      {showLocationPicker && (
        <LocationPickerModel
          visible={showLocationPicker}
          onClose={() => setShowLocationPicker(false)}
          onSelect={handleLocationSet}
          type={locationType}
          fromLocation={from || undefined}
        />
      )}
    </View>
  );
};

export default Search;
