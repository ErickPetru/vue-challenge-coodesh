import Vue from 'vue'

Vue.filter('mediaToSrcset', function (media) {
  const srcset = []

  if (media.medium) {
    srcset.push(`${media.medium} 378w`)
  }
  if (media.large) {
    srcset.push(`${media.large} 500w`)
  }
  if (media.medium_large) {
    srcset.push(`${media.medium_large} 768w`)
  }
  if (media['big-size']) {
    srcset.push(`${media['big-size']} 470w`)
  }
  if (media['big-size_mobile']) {
    srcset.push(`${media['big-size_mobile']} 370w`)
  }
  if (media['mid-size']) {
    srcset.push(`${media['mid-size']} 280w`)
  }
  if (media['mid-size_mobile']) {
    srcset.push(`${media['mid-size_mobile']} 160w`)
  }
  if (media['1536x1536']) {
    srcset.push(`${media['1536x1536']} 900w`)
  } else if (media['2048x2048']) {
    srcset.push(`${media['2048x2048']} 900w`)
  }

  return srcset.length ? srcset.join(', ').substr(0, -2) : null
})
