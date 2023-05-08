#!/bin/python3

import cv2
import sys
import rospy
import os
import yaml
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import numpy as np

def crop_image(event, x, y, flags, param):
    global mouseX, mouseY, cropping
    if event == cv2.EVENT_LBUTTONDOWN:
        mouseX, mouseY = x, y
        cropping = True
    elif event == cv2.EVENT_LBUTTONUP:
        mouseX2, mouseY2 = x, y
        cropping = False
        cv2.imshow("image", image)
        y_low = min(mouseY, mouseY2)
        y_high = max(mouseY, mouseY2)
        x_low = min(mouseX, mouseX2)
        x_high = max(mouseX, mouseX2)
        params['crop'] = [x_low, x_high, y_low, y_high]
        print(f'{x_low}, {x_high}, {y_low}, {y_high}')

        cropped_image = image[y_low: y_high, x_low:x_high]
        cv2.imshow("cropped", cropped_image)
        cv2.imwrite(f"{save_dir}/template.png", cropped_image)


if __name__ == "__main__":
    global save_dir, params
    params = dict()
    #save_dir = f"templates/{sys.argv[1]}"
    save_dir = f"/home/platonics/Documents/robothon/src/franka_ros/robotthon_23_platonics/manipulation_tasks_panda/box_localization/cfg/{sys.argv[1]}"
    params['template_path'] = f"{save_dir}/full_image.png"
    os.mkdir(save_dir)
    rospy.init_node('test')
    try:
        bridge = CvBridge()
        msg_depth = rospy.wait_for_message('camera/depth/image_rect_raw', Image, timeout=10)
        msg = rospy.wait_for_message('camera/color/image_raw', Image, timeout=10)
        image = bridge.imgmsg_to_cv2(msg, desired_encoding="bgr8")
        depth = bridge.imgmsg_to_cv2(msg_depth, desired_encoding="passthrough")
        cv2.imwrite(f"{save_dir}/full_image.png", image)
        cv2.imwrite(f"{save_dir}/depth.png", depth)
    except:
        print("Image is not found after timeout of 10 seconds")


    # Create window and set mouse callback function
    cv2.namedWindow("image")
    cv2.setMouseCallback("image", crop_image)

    # Loop until user presses 'q'
    cropping = False
    while True:
        cv2.imshow(f"image", image)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    params['template_depth'] = float(np.mean(depth[params['crop'][2]:params['crop'][3], params['crop'][0]:params['crop'][1]]))
    with open(f"{save_dir}/params.yaml", 'w') as file:
        yaml.dump(params, file)

