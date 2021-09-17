import cv2
import time
import matplotlib.pyplot as plt
from numba import jit

# haarcascade 불러오기
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# 이미지 불러오기
cap = cv2.VideoCapture('mask-23.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)

cou = 0

@jit
def ff(gray):
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    return faces

while (True):
    ret, frame = cap.read()
    img = frame
    cv2.namedWindow('image', cv2.WINDOW_GUI_NORMAL)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 얼굴 찾기
    faces = ff(gray)
    print(len(faces))

    if cou%30 == 0 and len(faces) > 0:
        for (x, y, w, h) in faces:
            a = 24
            b = 3
            cv2.rectangle(img, (x-b, y-a), (x + w + b, y + h + a), (255, 0, 0), 2)
            \
            # 눈 찾기
            #roi_color = img[y:y + h, x:x + w]
            #roi_gray = gray[y:y + h, x:x + w]
            #eyes = eye_cascade.detectMultiScale(roi_gray)
            #for (ex, ey, ew, eh) in eyes:
            #    cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0, 255, 0), 2)

            face = img[y-a:y+h+a, x-b:x+w+b]
            face = cv2.resize(face, dsize=(224, 224))
        cv2.imshow('face', face)
        img_file = 'D:/python_work/Cam/face_image/' +time.strftime('%y-%m-%d-%H-%M-%S') +'.jpg'
        cv2.imwrite(img_file, face)
    cou += 1

    # 영상 출력
    #channels = cv2.split(face)
    #colors = ['b', 'g', 'r']
    #for ch, color in zip(channels, colors):
    #    hist = cv2.calcHist([ch], [0], None, [256], [0, 256])
    #    plt.plot(hist, color=color)

    #plt.pause(0.01)
    #plt.clf()

    cv2.imshow('image', img)

    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()
