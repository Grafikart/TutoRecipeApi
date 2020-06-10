export function wait (duration: number): Promise<void> {
  return new Promise<void>(function (resolve) {
    setTimeout(function () {
      resolve()
    }, duration)
  })
}
