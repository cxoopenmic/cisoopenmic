from PIL import Image,ImageDraw,ImageFilter
import numpy as np
from pathlib import Path
root=Path(__file__).resolve().parents[2] / 'public'
bg=Image.open(Path(__file__).with_name('curtain-plain.png')).convert('RGB')
w,h=bg.size
logo=Image.open(root/'assets/logo.png').convert('RGBA')
mask=Image.new('L',logo.size);ImageDraw.Draw(mask).ellipse((2,2,logo.width-3,logo.height-3),fill=255)
logo.putalpha(mask.filter(ImageFilter.GaussianBlur(1)))
# Match the first design's loose repeat and scale. Only geometric fabric
# distortion is applied to the original logo; none of its artwork is redrawn.
positions=[(.165,.05,158,208,-10),(.84,.05,153,207,11),(-.015,.16,147,204,-12),(.385,.205,157,213,-11),(.615,.205,153,205,12),(1.005,.17,157,211,13),(.165,.39,162,210,-10),(.845,.39,155,208,10),(-.02,.56,150,200,-9),(.375,.57,151,208,-10),(.615,.57,154,207,12),(1.01,.57,155,208,12),(.155,.78,160,208,-11),(.85,.78,156,207,11),(.36,.975,154,208,-10),(.61,.975,155,210,11)]
layer=Image.new('RGBA',bg.size)
for x,y,lw,lh,angle in positions:
 stamp=logo.resize((lw,lh),Image.Resampling.LANCZOS).rotate(angle,resample=Image.Resampling.BICUBIC,expand=True)
 layer.alpha_composite(stamp,(round(x*w-stamp.width/2),round(y*h-stamp.height/2)))
a=np.asarray(layer).copy();base=np.asarray(bg).astype(float)/255
# Smooth lateral displacement bends each printed emblem around the same
# vertical curtain pleats without replacing any part of the official logo.
yy,xx=np.indices((h,w));shift=8*np.sin(xx/42)+3*np.sin(xx/87+yy/650)
sx=np.clip(np.rint(xx+shift).astype(int),0,w-1)
a=a[yy,sx]
light=np.asarray(bg.convert('L').filter(ImageFilter.GaussianBlur(15))).astype(float)/255
shade=np.clip(.64+light*1.5,.55,1.08)
fine=np.asarray(bg.convert('L')).astype(float)/255
texture=np.clip(1+(fine-light)*1.1,.72,1.16)
rgb=a[:,:,:3].astype(float)/255
rgb*=shade[:,:,None]*texture[:,:,None]
# A restrained warm cast matches the amber stage lights, preserving silver,
# orange rays, lettering and the original microphone silhouette.
rgb*=np.array([1.0,.94,.86])
alpha=a[:,:,3:4].astype(float)/255*.92*(.3+.7*(a[:,:,:3].max(axis=2,keepdims=True)/255)**.4)
out=base*(1-alpha)+np.clip(rgb,0,1)*alpha
Image.fromarray(np.uint8(np.clip(out,0,1)*255)).save(root/'assets/team/team-curtain-original-logo.jpg',quality=92,optimize=True)
print(w,h)
