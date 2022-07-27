class SpecialRule:
    """
    This class only take care the special rule 
    """
    @staticmethod
    def validate(values, current=13):
            # sanity check
            if len(values) != 14 or len(values) <= 0:
                return False

            # 0 - Background (no constraints)

            # 1 - Skin constraints
            if current < 1:
                return True
            elif values[1] > 4 and values[1] != 8:
                return False

            # 2 - Silhouette
            if current < 2:
                return True
            elif values[2] > 2:
                return False

            # 3 - Shirt
            if current < 3:
                return True
            elif values[3] > 38 and values[3] not in [53, 54, 55] and values[2] == 1:
                return False
            elif (values[3] == 1 or values[3] > 43) and values[3] not in [53, 55] and values[2] == 2:
                return False
            elif values[3] in [18, 19] and values[0] == 12:
                return False
            elif values[3] in [23, 28] and values[1] == 3:
                return False

            # 4 - Eyes
            if current < 4:
                return True
            elif values[4] > 6 and values[2] == 1:
                return False
            elif values[4] > 11 and values[4] not in [20, 21, 22, 23] and values[2] == 2:
                return False
            elif values[4] == 5 and values[3] in [33, 34, 35]:
                return False

            # 5 - Nose
            if current < 5:
                return True
            elif values[5] > 5:
                return False

            # 6 - Face Trait
            if current < 6:
                return True
            elif values[6] == 27 and values[2] == 1:
                return False
            elif values[6] not in [0, 26, 28] and values[2] == 2:
                return False
            elif values[6] in [24, 25] and (values[5] != 2 or values[4] != 6): # Clown
                return False
            elif values[6] in [3, 6, 19, 20, 23] and values[1] == 3:
                return False
            elif values[6] in [9, 10] and values[1] in [1, 2, 4]:
                return False
            elif values[6] == 4 and values[3] in [33, 34, 35]:
                return False
            elif values[6] in [3, 20, 21] and values[1] == 3:
                return False
            elif values[6] in [17, 18] and values[3] in [12, 13]:
                return False

            # 7 - Mouth
            if current < 7:
                return True
            elif values[7] > 4 and values[2] == 1:
                return False
            elif values[7] > 9 and values[7] not in [18, 19, 20] and values[2] == 2:
                return False
            elif values[7] in [2, 3, 4] and values[6] == 4:
                return False
            elif values[7] in [3, 4, 22] and values[6] in [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23]:
                return False
            elif values[7] == 1 and values[6] in [7, 8, 9]:
                return False
            elif values[7] == 11 and values[6] not in [24, 25]: # Clown
                return False
            elif values[7] in [13, 14] and (values[6] > 0 or values[5] != 2 or values[4] != 6): # Clown
                return False
            elif values[7] == 12 and values[6] != 24:
                return False
            elif values[7] == 18 and values[1] not in [3, 4]:
                return False

            # 8 - Hair
            if current < 8:
                return True
            elif values[8] > 29 and values[8] not in [46, 47, 52] and values[2] == 1:
                return False
            elif values[8] in [27, 33, 40, 48] and values[0] in [2, 3, 4, 12]:
                return False
            elif (values[8] < 20 or values[8] > 40) and values[8] != 0 and values[8] not in [48, 49, 50, 51] and values[2] == 2:
                return False
            elif values[8] > 0 and values[3] in [33, 34, 35]:
                return False
            elif values[8] in [19, 25, 26] and values[6] in [1, 2, 4, 7, 8, 9, 14, 15, 16, 17, 18, 19, 20, 23]:
                return False
            elif values[8] in [27, 28, 29] and values[6] in [1, 2, 4, 7, 8, 9]:
                return False
            elif values[8] in [41, 42] and values[7] not in [11, 12, 13, 14]:
                return False
            elif values[8] == 0 and values[2] == 2 and values[3] not in [33, 34, 35]:
                return False

            # 9 - Earring
            if current < 9:
                return True
            elif values[9] == 1 and values[2] == 1:
                return False
            elif values[9] == 2 and values[8] in [25, 26, 27, 28, 29]:
                return False
            elif values[9] > 0 and values[2] == 2 and values[8] in [25, 26, 27, 28, 29, 33, 34, 36, 37, 38, 39, 40, 48, 49, 50, 51]:
                return False
            elif values[9] > 0 and values[3] in [33, 34, 35]:
                return False
            elif values[9] == 1 and values[8] == 30:
                return False
            elif values[9] == 3 and values[8] > 24 and values[8] not in [46, 47, 52]:
                return False
            elif values[9] in [1, 2] and values[6] in [1, 2, 24]:
                return False

            # 10 - Neck
            if current < 10:
                return True
            elif values[10] != 0 and values[10] > 8 and values[2] == 1:
                return False
            elif values[10] != 0 and values[10] < 6 and values[2] == 2:
                return False
            elif values[10] > 0 and values[3] in [33, 34, 35]:
                return False
            elif values[10] in [6, 7, 11] and values[3] in [6, 14, 24, 37, 38, 42, 43]:
                return False
            elif values[10] in [8, 9, 10] and values[3] in [12, 13, 14, 24, 25, 37, 38, 42, 43]:
                return False
            elif values[10] in [6, 9, 11] and values[3] == [18]:
                return False
            elif values[10] in [1, 2, 3, 4, 5] and (values[3] != 6 or values[6] in [14, 15, 16, 25]):
                return False
            elif values[10] in [6, 9, 10, 11] and values[0] in [3, 12]:
                return False
            elif values[10] not in [0, 8, 10] and values[3] in [53, 54, 55]:
                return False
            elif values[10] in [6, 9, 10, 11] and values[3] in [3, 18, 19]:
                return False
            elif values[10] == 8 and (values[6] in [14, 15, 16, 17, 18, 25] or values[1] == 3):
                return False
            elif values[10] > 0 and values[3] == 36:
                return False
            elif values[10] == 7 and values[3] in [11, 32, 39]:
                return False
            
            # 11 - Mouth Accessory
            if current < 11:
                return True
            elif values[11] in [3, 4] and values[6] in [1, 2, 4, 13, 16, 17, 18, 24, 25]:
                return False
            elif values[11] in [3, 4, 5] and values[5] == 5:
                return False
            elif values[11] == 3 and values[1] == 4:
                return False
            elif values[11] == 4 and values[1] == 2:
                return False
            elif values[11] == 5 and values[3] != 37:
                return False
            elif values[11] in [1, 2, 6, 7] and values[7] in [3, 4, 9, 18, 19, 20, 21, 22]:
                return False
            elif values[11] in [3, 4] and values[6] in [17, 18]:
                return False
            elif values[11] > 0 and values[7] in [11, 12, 13, 14]: # Clown
                return False
            elif values[11] > 0 and values[6] in [4, 26, 28]:
                return False
            elif values[11] in [1, 2, 6, 7] and values[8] == 30:
                return False
            elif values[11] in [1, 6] and values[6] in [26, 28]:
                return False

            # 12 - Glasses
            if current < 12:
                return True
            elif values[12] > 0 and values[4] == 5:
                return False
            elif values[12] == 13 and values[4] not in [4, 7, 8, 10, 11]:
                return False
            elif values[12] in [11, 12] and (values[6] in [4, 7, 8, 9, 19, 20, 23, 24, 25, 26, 28] or values[11] in [3, 4, 5]):
                return False
            elif values[12] > 16 and values[12] != 28 and values[1] == 1:
                return False
            elif values[12] > 22 and values[12] != 28 and values[1] == 2:
                return False
            elif values[12] == 13 and values[8] in [25, 33]:
                return False
            elif values[12] in [5, 28] and values[0] in [2, 3, 4]:
                return False
            elif values[12] in [8, 9, 10] and values[4] == 2:
                return False
            elif values[12] in [7, 11, 12, 13, 24, 25, 27, 29] and values[9] > 0:
                return False
            elif values[12] > 0 and values[9] == 3:
                return False
            elif values[12] in [14, 15, 23] and values[1] == 2:
                return False
            elif values[12] in [14, 15, 23] and values[6] in [7, 8, 9, 19, 20, 23]:
                return False
            elif values[12] == 22 and values[1] == 3:
                return False
            elif values[12] in [1, 2, 5, 7, 11, 12, 13, 17, 18, 28] and values[9] > 0:
                return False
            elif values[12] in [8, 9, 10, 17, 18, 19, 20, 21] and values[3] in [33, 34, 35]:
                return False
            elif values[12] in [19, 20, 21] and values[8] == 31:
                return False
            elif values[12] == 13 and values[8] in [31, 35]:
                return False

            # 13 - Hat
            if current < 13:
                return True
            elif values[13] not in [0, 13] and values[3] == 37:
                return False
            elif values[13] == 3 and (values[6] == 4 or values[8] not in [0, 8, 10, 11, 12, 13, 14, 15, 16] or values[9] == 1 or values[10] not in [0, 9, 11] or values[11] in [1, 2, 6, 7] or values[12] > 0):
                return False
            elif values[13] == 1 and (values[8] in [6, 7, 10, 11, 12, 13, 19, 20] or (values[8] > 24 and values[8] not in [46, 47, 52])):
                return False
            elif values[13] == 2 and values[8] not in [0, 4, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 52]:
                return False
            elif values[13] > 0 and (values[3] in [33, 34, 35] or values[12] in [11, 12]):
                return False
            elif values[13] in [4, 5] and values[8] in [4, 16, 17, 20, 21, 22, 23, 24, 26, 31, 32, 33, 34, 36, 37, 38, 39, 48, 49, 50, 51]:
                return False
            elif values[13] == 6 and (values[3] != 24 or values [8] in [0, 6, 7, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 34, 35, 36, 37, 38, 39, 40, 48, 49, 50, 51]):
                return False
            elif values[13] == 7 and values[8] not in [0, 4, 14, 15, 16, 17, 20, 33, 47, 52]:
                return False
            elif values[13] in [8, 9, 11, 13] and values[8] not in [0, 4, 14, 15, 16, 17, 20, 33, 52]:
                return False
            elif values[13] == 10 and (values[8] not in [0, 41, 42] or values[7] not in [11, 12, 13, 14] or values[4] != 6): # Clown
                return False
            elif values[13] == 12 and (values[3] != 37 or values[8] not in [4, 8, 14, 15, 16, 17]):
                return False
            elif values[13] > 0 and values[12] not in [0, 1, 2, 3, 5, 6, 7, 14, 15, 16, 22, 23, 28]:
                return False
            elif values[13] > 0 and values[3] == 36:
                return False
            elif values[13] == 22 and values[1] == 3:
                return False
            elif values[13] == 15 and (values[12] not in [0, 6] or values[11] in [1, 2, 7] or values[8] in [6, 20, 21, 22, 23, 24, 26, 29, 31, 32, 34, 35] or values[3] in [33, 34, 35]):
                return False

            return True