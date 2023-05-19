import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import api from '../../services/api'
import { Logo } from '../../components/logo'
import { FoodList } from '../../components/foodList'

import { useNavigation } from '@react-navigation/native'

import { Text as MotiText } from 'moti'

export function Home() {
  const [inputValue, setInputValue] = useState('')
  const [foods, setFoods] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get('/foods')
      setFoods(response.data)
    }
    fetchApi()
  }, [])

  function handleSearch() {
    if (!inputValue) return

    let input = inputValue
    setInputValue('')
    navigation.navigate('Search', { name: input })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 100,
          type: 'timing',
          duration: 650
        }}
      >
        Encontre a receita
      </MotiText>
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 18
        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 200,
          type: 'timing',
          duration: 850
        }}
      >
        que combina com você
      </MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da comida"
          style={styles.input}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" color="#4CBE6C" size={28} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        renderItem={({ item }) => <FoodList data={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 26 : 32,
    paddingStart: 14,
    paddingEnd: 14
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0E0E0E'
  },
  form: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '90%',
    maxWidth: '90%',
    height: 54
  }
})
