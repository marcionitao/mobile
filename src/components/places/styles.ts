import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 12,
    padding: 12,
    paddingBottom: 100,
  },
  indicator: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray[300],
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[600],
    marginBottom: 16,
  },
})
