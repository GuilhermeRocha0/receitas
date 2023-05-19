import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import api from '../../services/api'

import { FoodList } from '../../components/foodList'

export function Search() {
  const [recipes, setRecipes] = useState([])

  const route = useRoute()

  useEffect(() => {
    async function fetchRecipes() {
      const reponse = await api.get(`/foods?name_like=${route.params?.name}`)
      setRecipes(reponse.data)
    }

    fetchRecipes()
  }, [route.params?.name])

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FoodList data={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <Text style={styles.text}>Ops não encontramos sua receita...</Text>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14
  },
  text: {
    fontSize: 16
  }
})
