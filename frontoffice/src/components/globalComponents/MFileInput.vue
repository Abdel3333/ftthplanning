<template>
    <div>
        <div class="flex items-center" :class="errors ? 'min-h-42 border border-kkiapayRed rounded-md p-1' : 'min-h-42 border border-borderColor rounded-md p-1'">
          <div :class="this.filelist == null ? 'border border-blueNormal border-dashed' : 'bg-tint70'" class="rounded h-full w-full relative" @dragover="dragover" @dragleave="dragleave" @drop="drop">
              <input class="w-full opacity-0 overflow-hidden absolute focus:outline-none" title=" " type="file" @change="onChange" ref="file" :accept="accept">
              <label v-if="this.filelist == null" for="assetsFieldHandle" class="block cursor-pointer">
                  <div class="py-1.5 text-center flex items-center justify-center space-x-2 text-10 lg:text-xs">
                    <p>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.50203 6.43861C6.26278 4.56312 8.16828 2.78906 11.011 2.78906C14.0694 2.78906 16.676 4.87 17.2475 8.2375C18.0545 8.35829 18.8994 8.66735 19.5951 9.18414C20.4598 9.82645 21.1069 10.8052 21.1069 12.112C21.1069 13.3791 20.5734 14.3872 19.7049 15.0629C18.8535 15.7253 17.7204 16.04 16.5322 16.04H13.535C13.1865 16.04 12.904 15.7575 12.904 15.409C12.904 15.0605 13.1865 14.778 13.535 14.778H16.5322C17.513 14.778 18.3517 14.5167 18.93 14.0668C19.4911 13.6303 19.8449 12.9899 19.8449 12.112C19.8449 11.2739 19.4469 10.6461 18.8426 10.1972C18.2227 9.73675 17.4011 9.48207 16.6587 9.4453C16.3479 9.4299 16.0947 9.19018 16.0624 8.88066C15.7444 5.83891 13.5582 4.05105 11.011 4.05105C8.60562 4.05105 7.06776 5.63785 6.56387 7.20939C6.48681 7.44973 6.27394 7.62103 6.02268 7.6449C3.84829 7.85147 2.17703 9.19011 2.17703 11.2129C2.17703 13.2464 3.93417 14.778 6.2785 14.778H8.48699C8.83548 14.778 9.11798 15.0605 9.11798 15.409C9.11798 15.7575 8.83548 16.04 8.48699 16.04H6.2785C3.41713 16.04 0.915039 14.1106 0.915039 11.2129C0.915039 8.45699 3.0969 6.81054 5.50203 6.43861Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5648 8.02173C10.8112 7.77531 11.2107 7.77531 11.4571 8.02173L13.9811 10.5457C14.2275 10.7921 14.2275 11.1917 13.9811 11.4381C13.7347 11.6845 13.3352 11.6845 13.0887 11.4381L11.0109 9.36027L8.93313 11.4381C8.68672 11.6845 8.28719 11.6845 8.04077 11.4381C7.79435 11.1917 7.79435 10.7921 8.04077 10.5457L10.5648 8.02173Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0109 8.46777C11.3594 8.46777 11.6419 8.75028 11.6419 9.09877V18.5803C11.6419 18.9288 11.3594 19.2113 11.0109 19.2113C10.6624 19.2113 10.3799 18.9288 10.3799 18.5803V9.09877C10.3799 8.75028 10.6624 8.46777 11.0109 8.46777Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="20.1919" height="20.1919" fill="white" transform="translate(0.915039 0.904297)"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </p>
                    <p>Glissez le fichier ici ou <span class="rounded-l30 px-1 bg-blueLighter-active">Naviguez</span></p>
                  </div>
              </label>
              <div class="flex justify-between h-full py-1 px-2" v-if="this.filelist !== null" v-cloak>
                <div class="flex space-x-1 z-10 w-2/3">
                  <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45372 4.06164C7.01442 4.06164 6.59312 4.23615 6.28249 4.54678C5.97186 4.8574 5.79736 5.27871 5.79736 5.718V22.2816C5.79736 22.7209 5.97186 23.1422 6.28249 23.4529C6.59312 23.7635 7.01442 23.938 7.45372 23.938H19.0483C19.4876 23.938 19.9089 23.7635 20.2195 23.4529C20.5301 23.1422 20.7046 22.7209 20.7046 22.2816V12.2012C20.7046 12.2012 20.7046 12.2013 20.7046 12.2012C20.7046 11.9817 20.6174 11.7711 20.4622 11.6159C20.4622 11.6159 20.4622 11.6159 20.4622 11.6159L13.1505 4.30414C12.9952 4.14893 12.7847 4.0617 12.5652 4.06164C12.5651 4.06164 12.5652 4.06164 12.5652 4.06164H7.45372ZM5.11127 3.37555C5.73252 2.75429 6.57513 2.40527 7.45372 2.40527H12.5652C13.2239 2.40537 13.8557 2.66705 14.3215 3.13278L21.6334 10.4447C22.0991 10.9105 22.3609 11.5423 22.361 12.201V22.2816C22.361 23.1602 22.012 24.0028 21.3907 24.6241C20.7695 25.2454 19.9269 25.5944 19.0483 25.5944H7.45372C6.57513 25.5944 5.73252 25.2454 5.11127 24.6241C4.49001 24.0028 4.14099 23.1602 4.14099 22.2816V5.718C4.14099 4.83941 4.49001 3.99681 5.11127 3.37555Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2509 2.81934C13.7083 2.81934 14.0791 3.19013 14.0791 3.64752V9.85888C14.0791 10.0785 14.1663 10.2892 14.3217 10.4445C14.477 10.5998 14.6876 10.6871 14.9073 10.6871H21.1186C21.576 10.6871 21.9468 11.0579 21.9468 11.5152C21.9468 11.9726 21.576 12.3434 21.1186 12.3434H14.9073C14.2483 12.3434 13.6164 12.0817 13.1504 11.6157C12.6845 11.1498 12.4227 10.5178 12.4227 9.85888V3.64752C12.4227 3.19013 12.7935 2.81934 13.2509 2.81934Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28186 15.6563C8.28186 15.1989 8.65265 14.8281 9.11004 14.8281H17.3919C17.8493 14.8281 18.22 15.1989 18.22 15.6563C18.22 16.1137 17.8493 16.4845 17.3919 16.4845H9.11004C8.65265 16.4845 8.28186 16.1137 8.28186 15.6563Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.28186 19.7969C8.28186 19.3395 8.65265 18.9688 9.11004 18.9688H17.3919C17.8493 18.9688 18.22 19.3395 18.22 19.7969C18.22 20.2543 17.8493 20.6251 17.3919 20.6251H9.11004C8.65265 20.6251 8.28186 20.2543 8.28186 19.7969Z" fill="black"/>
                  </svg>
                  <div class="text-9 w-full">
                      <p class="flex justify-between">
                        <span>{{ filelist.name }}</span>
                        <span>
                          <span v-if="!successUpload" >{{ uploadPercentage }} %</span>
                          <span v-else class="text-greenStep">Terminé</span>
                          <span v-if="uploadFailed" class="text-red-600">Echec</span>
                        </span>
                      </p>
                      <progress :class="!successUpload ? 'progressClass' : (successUpload ? 'progressSuccessClass' : 'progressFailedClass')" class="rounded-full" :value="uploadPercentage" max="100"></progress>
                  </div>
                </div>
                
                <p class="flex space-x-4 items-center">
                  <span class="text-9" v-if="successUpload">Modifier</span>
                  <span class="text-9" v-if="uploadFailed">Réessayer</span>
                  <span class="z-10" @click="remove">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.05062 3.46785C4.20046 3.31801 4.44341 3.31801 4.59326 3.46785L9.96511 8.83971C10.115 8.98955 10.115 9.2325 9.96511 9.38235C9.81527 9.53219 9.57232 9.53219 9.42247 9.38235L4.05062 4.01049C3.90077 3.86065 3.90077 3.6177 4.05062 3.46785Z" fill="black"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.96511 3.46785C10.115 3.6177 10.115 3.86065 9.96511 4.01049L4.59326 9.38235C4.44341 9.53219 4.20046 9.53219 4.05062 9.38235C3.90077 9.2325 3.90077 8.98955 4.05062 8.83971L9.42247 3.46785C9.57232 3.31801 9.81527 3.31801 9.96511 3.46785Z" fill="black"/>
                    </svg>
                  </span>
                </p>
              </div>
          </div>
      </div>
      <span v-if="errors" class="flex space-x-1 text-xs md:text-sm mt-1 items-center">
          <svgicon name="error" width="16" height="16"></svgicon> 
          <span>{{ errors }}</span>
      </span>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    errors:null,
    accept: {
      type: String,
      default: '.pdf,.jpg,.jpeg,.png'
    },
    initialFile: {
      type: String,
      default: ''
    }
  },
  data() {
      return {
        filelist: null,
        fileId: '',
        uploadPercentage: 0,
        successUpload: false,
        uploadFailed: false,
      }
  },
  watch: {
    
  },
  mounted() {
    if (this.initialFile) {
      axios.request({
        method: "get",
        url: `/file/${this.initialFile}`,
      })
      .then(res => {
        this.successUpload = true
        this.uploadPercentage = 100
        console.log(res.data)
        const file = res.data
        this.filelist = {
          name: file.filename,
          size: file.chunkSize,
          type: file.contentType
        }
      })
      .catch(err => {
        console.log(err)
        this.uploadFailed = true
      })
    }
  },
  methods: {
  onChange() {
    const file = this.$refs.file.files[0];
    const name = file.name
    const formData = new FormData()
    formData.append('name',name)
    formData.append('file', file)
    axios.request({
      headers:{},
      method: "post",
      url: `/files`,
      data: formData,
      onUploadProgress: progressEvent => {
        this.uploadPercentage =  parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ))
      }
    })
    .then(res => {
      console.log(res)
      this.fileId = res.data._id
      this.$emit('input', this.fileId)
      this.successUpload = true
    })
    .catch(err => {
      console.log(err)
      this.uploadFailed = true
    })
    this.filelist = file;
  },
  remove() {
    this.$refs.file.value=null;
    this.filelist = null
    this.uploadPercentage = 0
    this.successUpload= false
    this.uploadFailed = false
  },
  dragover(event) {
    event.preventDefault();
    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains('bg-green-300')) {
      event.currentTarget.classList.remove('bg-gray-100');
      event.currentTarget.classList.add('bg-green-300');
    }
  },
  dragleave(event) {
    // Clean up
    event.currentTarget.classList.add('bg-gray-100');
    event.currentTarget.classList.remove('bg-green-300');
  },
  drop(event) {
    event.preventDefault();
    console.log(event.dataTransfer.files[0].type);
    if(this.accept =='.pdf,.jpg,.jpeg,.png') {
      if(['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(event.dataTransfer.files[0].type)){
        this.$refs.file.files = event.dataTransfer.files;
        this.onChange(); // Trigger the onChange event manually
      }
      else {
        this.dragleave(event)
      }
    }
    else {
      if(['.csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.dataTransfer.files[0].type)){
        this.$refs.file.files = event.dataTransfer.files;
        this.onChange(); // Trigger the onChange event manually
      }
      else {
        this.dragleave(event)
      }
    }
    
    //event.currentTarget.classList.add('bg-gray-100');
    //event.currentTarget.classList.remove('bg-green-300');
  }
  }
}
</script>

<style scoped>
progress {
	border: 0;
  height: 6px;
  border-radius: 100px;
}
progress::-webkit-progress-bar {
    border: 0;
  height: 6px;
  border-radius: 100px;
}
progress::-webkit-progress-value {
    border: 0;
  height: 6px;
  border-radius: 100px;
}
progress::-moz-progress-bar {
    border: 0;
  height: 6px;
  border-radius: 100px;
}

.progressClass[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;

  width: 100%;
  height:6px;
  border-radius:100px;
}
.progressClass[value]::-webkit-progress-value {
  background-image:
    -webkit-linear-gradient(45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),
    -webkit-linear-gradient(left, #34775C, #27AE60);
  border-radius: 100px; 
  background-size: 35px 20px, 100% 100%, 100% 100%;
  -webkit-animation: animate-stripes 5s linear infinite;
  animation: animate-stripes 5s linear infinite;
}
.progressSuccessClass[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;

  width: 100%;
  height:6px;
  border-radius:100px;
}
.progressSuccessClass[value]::-webkit-progress-value {
  background-image:
    -webkit-linear-gradient(0deg, transparent 33%, rgba(0, 0, 0, 0) 33%, rgba(0,0, 0, 0) 66%, transparent 66%),
    -webkit-linear-gradient(left, #27AE60, #27AE60);
  border-radius: 100px; 
  background-size: 35px 20px, 100% 100%, 100% 100%;
  -webkit-animation: animate-stripes 5s linear infinite;
  animation: animate-stripes 5s linear infinite;
}
.progressFailedClass[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;

  width: 100%;
  height:6px;
  border-radius:100px;
}
.progressFailedClass[value]::-webkit-progress-value {
  background-image:
    -webkit-linear-gradient(0deg, transparent 33%, rgba(0, 0, 0, 0) 33%, rgba(0,0, 0, 0) 66%, transparent 66%),
    -webkit-linear-gradient(left, #EB5757, #EB5757);
  border-radius: 100px; 
  background-size: 35px 20px, 100% 100%, 100% 100%;
  -webkit-animation: animate-stripes 5s linear infinite;
  animation: animate-stripes 5s linear infinite;
}
@-webkit-keyframes animate-stripes {
   100% { background-position: -100px 0px; }
}

@keyframes animate-stripes {
   100% { background-position: -100px 0px; }
}

</style>